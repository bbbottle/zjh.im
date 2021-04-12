import { AppStore } from "../../../../store/app_store";
import "./handle_externals";

const createInstaller = (subShell, options) => async (appMeta, app) => {
  const { addSitePage, addCanvasApp } = options;
  const success = subShell.shell.chalk.green;
  const err = subShell.shell.chalk.red;

  switch (appMeta.type) {
    case "command":
      subShell.shell.command(appMeta.name, app.handler);
      await subShell.printLine(success("New command added."));
      break;
    case "page":
      if (typeof addSitePage === "function") {
        addSitePage(app);
        await subShell.printLine(success("New page added."));
        break;
      }
    case "window":
      if (typeof addCanvasApp === "function") {
        addCanvasApp(app);
        await subShell.printLine(success("New canvas app added."));
        break;
      }
    default:
      await subShell.printLine(err("Unsupported App Type."));
  }
};

export const connectShellToStore = async (shell, options) => {
  shell.command(
    "install",
    async (subShell, args) => {
      const makePrinter = (colorFn) => (msg) =>
        subShell.printLine(colorFn(msg));

      const g = subShell.shell.chalk.green;
      const error = makePrinter(subShell.shell.chalk.red);
      const warning = makePrinter(subShell.shell.chalk.yellow);
      const success = makePrinter(g);

      let store;
      try {
        store = await AppStore.create({
          installer: createInstaller(subShell, options),
        });
      } catch (e) {
        return await error(e.message);
      }

      const appName = args && args[0];
      if (!appName) {
        await subShell.printLine(`STORE VERSION: ${g(store.version)}`);
        await subShell.printLine("Available apps:");

        for (let appMeta of store.appsMeta) {
          const appName = g(appMeta.name);
          await subShell.printLine(`- ${appName}`);
        }

        await subShell.printLine("");
        await subShell.printLine("Usage: install <App Name>");
        return;
      }

      if (store.installedAppsMap.has(appName)) {
        return await warning("App has been installed already.");
      }

      if (!store.availableAppsMap.has(appName)) {
        return error(`App not found: ${appName}`);
      }

      try {
        await store.install(appName);
      } catch (e) {
        error(e.message);
      }
    },
    true
  );
};
