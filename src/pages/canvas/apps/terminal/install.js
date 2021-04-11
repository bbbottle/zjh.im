import { apiURL, STORE_CDN_BASE_URL } from "../../../../constants";
import "./handle_externals";

const InstalledAppMap = new Map();

const getStoreVersion = async () => {
  const res = await window.fetch(apiURL.store);
  const release = await res.json();
  return release.data.tag_name;
};

const getMetaInfoCDNPath = (ver) => {
  const VER = `@${ver}`;
  return `${STORE_CDN_BASE_URL}${VER}/apps_meta.json`;
};

const getMetaInfo = async (version) => {
  const res = await window.fetch(getMetaInfoCDNPath(version));
  return await res.json();
};

const printAppInfo = async (shell, app) => {
  const appName = shell.shell.chalk.green(app.name);
  await shell.printLine(`- ${appName}`);
};

const printHelpInfo = async (shell, options = {}) => {
  const { storeVersion, appsMeta } = options;

  try {
    const storeVer = storeVersion || (await getStoreVersion());
    await shell.printLine(
      `STORE VERSION: ${shell.shell.chalk.green(storeVer)}`
    );
    await shell.printLine("");
    const metaInfo = appsMeta || (await getMetaInfo(storeVer));
    await shell.printLine("Available apps: ");
    for (let app of metaInfo) {
      await printAppInfo(shell, app);
    }
    await shell.printLine("");
  } catch (e) {
    await shell.printLine(shell.shell.chalk.red(e.message));
  }
};

const loadApp = async (appName, shell, options) => {
  const { appsMeta, addSitePage, addCanvasApp } = options;
  const app = appsMeta.find((a) => a.name === appName);
  if (!app) {
    await shell.printLine(shell.shell.chalk.red(`App not found: ${appName}`));
    return await printHelpInfo(shell, options);
  }

  const { default: appEntry } = await System.import(app.url);

  const success = shell.shell.chalk.green;
  const err = shell.shell.chalk.red;

  switch (app.type) {
    case "command":
      shell.shell.command(appEntry.name, appEntry.handler);
      await shell.printLine(success("New command added."));
      break;
    case "page":
      if (addSitePage) {
        InstalledAppMap.set(appName, true);
        addSitePage(appEntry);
        await shell.printLine(success("New page added."));
        break;
      }
    case "window":
      InstalledAppMap.set(appName, true);
      addCanvasApp(appEntry);
      await shell.printLine(success("New canvas app added."));
      break;
    default:
      await shell.printLine(err("Unsupported App Type."));
  }
};

export const getInstaller = ({ addSitePage, addCanvasApp }) => ({
  name: "install",
  handler: async (shell, args, parsed) => {
    const appName = args && args[0];
    if (InstalledAppMap.has(appName)) {
      return shell.printLine(
        shell.shell.chalk.yellow("App has been installed already.")
      );
    }

    const err = shell.shell.chalk.red;
    let storeVersion, appsMeta;
    try {
      storeVersion = await getStoreVersion();
      appsMeta = await getMetaInfo(storeVersion);
    } catch (e) {
      return shell.printLine(
        err("App Store is unavailable. Please try again later.")
      );
    }

    const options = {
      addSitePage,
      addCanvasApp,
      storeVersion,
      appsMeta,
    };
    if (appName) {
      await loadApp(appName, shell, options);
    } else {
      await printHelpInfo(shell, options);
    }
  },
});
