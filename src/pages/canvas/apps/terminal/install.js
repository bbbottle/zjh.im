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
  const { appsMeta } = options;
  const app = appsMeta.find((a) => a.name === appName);
  if (!app) {
    await shell.printLine(shell.shell.chalk.red(`App not found: ${appName}`));
    return await printHelpInfo(shell, options);
  }

  const { default: appEntry } = await System.import(app.url);
  const successMsg = shell.shell.chalk.green("DONE.");
  switch (app.type) {
    case "command":
      shell.shell.command(appEntry.name, appEntry.handler);
      shell.printLine(successMsg);
      InstalledAppMap.set(appName, true);
      break;
    default:
      throw new Error("Unsupported App Type.");
  }
};

export const install = {
  name: "install",
  handler: async (shell, args, parsed) => {
    const appName = args && args[0];
    if (InstalledAppMap.has(appName)) {
      return shell.printLine(
        shell.shell.chalk.yellow("App has been installed.")
      );
    }

    const storeVersion = await getStoreVersion();
    const appsMeta = await getMetaInfo(storeVersion);

    const options = {
      storeVersion,
      appsMeta,
    };
    if (appName) {
      await loadApp(appName, shell, options);
    } else {
      await printHelpInfo(shell, options);
    }
  },
};
