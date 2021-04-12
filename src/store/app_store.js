import { apiURL, STORE_CDN_BASE_URL } from "../constants";

const fetchLatestVersion = async () => {
  const res = await window.fetch(apiURL.storeVersion);
  const release = (await res.json()) || { data: {} };
  const { tag_name } = release.data;
  return tag_name;
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

const fetchMeta = async () => {
  let res;
  try {
    res = await fetchMetaInfoFromGithub();
  } catch (e) {
    res = await fetchMetaInfoFromCDN();
  }
  return res;
};

export class AppStore {
  constructor({ installer, uninstaller, appsMeta, version }) {
    this.version = version;
    this.appsMeta = appsMeta;
    this.installer = installer || (() => null);
    this.uninstaller = uninstaller || (() => null);
    this.availableAppsMap = new Map();
    appsMeta.forEach((appMeta) => {
      this.availableAppsMap.set(appMeta.name, appMeta);
    });
    this.installedAppsMap = new Map();
  }

  static async create({ installer, uninstaller }) {
    if (!window.System) {
      throw new Error(
        "Can not create app store. Some important globals are missing"
      );
    }

    if (this.instance) {
      return this.instance;
    }

    try {
      const { appsMeta, version } = await fetchMeta();

      this.instance = new AppStore({
        installer,
        uninstaller,
        version,
        appsMeta,
      });

      return this.instance;
    } catch (e) {
      throw new Error("Store is not available, please try again later");
    }
  }

  async install(appName) {
    const appMeta = this.availableAppsMap.get(appName);
    if (!appMeta) {
      throw new Error(`App not found: ${appName}`);
    }
    const { default: app } = await window.System.import(appMeta.url);
    try {
      await this.installer(appMeta, app);
      this.installedAppsMap.set(appName, app);
    } catch (e) {
      throw e;
    }
  }

  uninstall(appName) {
    const app = this.installedAppsMap.get(appName);
    if (!app) {
      return;
    }

    this.uninstaller(appName, app);
  }
}
