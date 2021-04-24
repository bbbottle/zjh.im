import { Subject } from "rxjs";
import { apiURL, STORE_CDN_BASE_URL } from "../constants";

const fetchLatestVersion = async () => {
  const res = await window.fetch(apiURL.storeVersion);
  const release = await res.json();
  return release.version;
};

const fetchMetaInfoFromCDN = async () => {
  const version = await fetchLatestVersion();
  const metaUrl = `${STORE_CDN_BASE_URL}${version}/apps_meta.json`;
  const res = await fetch(metaUrl);

  return {
    version,
    appsMeta: await res.json(),
  };
};

const fetchMetaInfoFromGithub = async () => {
  const version = "v0.0.0";
  const res = await fetch(apiURL.storeApps);
  return {
    version,
    appsMeta: await res.json(),
  };
};

const fetchMetaFromLocal = async () => {
  const version = "v?.?.?";
  const res = await fetch(browser.env.LOCAL_APP_META_URL);
  return {
    version,
    appsMeta: [await res.json()],
  };
};

const fetchMeta = async ({ onBeforeTryCDN, onBeforeTryGithub }) => {
  if (browser.env.MODE === "development") {
    return fetchMetaFromLocal();
  }
  let res;
  try {
    onBeforeTryCDN();
    res = await fetchMetaInfoFromCDN();
  } catch (e) {
    onBeforeTryGithub();
    res = await fetchMetaInfoFromGithub();
  }
  return res;
};

export class AppStore {
  constructor({ appsMeta, version }) {
    this.version = version;
    this.appsMeta = appsMeta;
    this.availableAppsMap = new Map();
    appsMeta.forEach((appMeta) => {
      this.availableAppsMap.set(appMeta.name, appMeta);
    });
    this.installedAppsSet = new Set();
    this._installedAppTypeMap = new Map();
  }

  static logger = new Subject();

  static getInstance = () => this.instance;

  static getInstalledCommands = () => {
    const inst = AppStore.getInstance();
    if (!inst) {
      return [];
    }
    return inst.getInstalledAppByType("command");
  };

  static async create({ logger }) {
    if (!window.System) {
      throw new Error(
        "Can not create app store. Some important globals are missing"
      );
    }

    if (this.instance) {
      return this.instance;
    }

    if (logger) {
      AppStore.logger.subscribe({
        next: logger,
      });
    }

    try {
      const { appsMeta, version } = await fetchMeta({
        onBeforeTryCDN: () => {
          AppStore.logger.next("Connecting to store...");
        },
        onBeforeTryGithub: () => {
          AppStore.logger.next("Connecting to store...");
        },
      });

      this.instance = new AppStore({
        version,
        appsMeta,
      });

      return this.instance;
    } catch (e) {
      console.log(e);
      throw new Error("Store is not available, please try again later");
    }
  }

  initInstaller = ({ installer, uninstaller }) => {
    this.installer = installer || (() => null);
    this.uninstaller = uninstaller || (() => null);
  };

  isAppInstalled = (appName) => {
    return this.installedAppsSet.has(appName);
  };

  isAppAvailable = (appName) => {
    return this.availableAppsMap.has(appName);
  };

  async install(appName) {
    const appMeta = this.availableAppsMap.get(appName);
    if (!appMeta) {
      throw new Error(`App not found: ${appName}`);
    }
    if (this.installedAppsSet.has(appName)) {
      throw new Error(`App has been installed already.`);
    }
    const { default: app } = await window.System.import(appMeta.url);
    try {
      await this.installer(appMeta, app);
      this.installedAppsSet.add(appName);

      const typedAppSet =
        this._installedAppTypeMap.get(appMeta.type) || new Set();

      this._installedAppTypeMap.set(appMeta.type, typedAppSet.add(app));
    } catch (e) {
      throw e;
    }
  }

  getInstalledAppByType = (type) => {
    const appSet = this._installedAppTypeMap.get(type);
    if (!appSet) {
      return [];
    }
    return Array.from(appSet.values());
  };

  uninstall(appName) {
    if (!this.installedAppsSet.has(appName)) {
      return;
    }

    this.uninstaller(appName);
  }
}
