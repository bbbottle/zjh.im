export const apiEndPoint = browser.env.API_URL; // developmentApiEndPoint;

export const apiURL = {
  articles: `${apiEndPoint}/blog/articles`,
  article: `${apiEndPoint}/blog/article`,
  photos: `${apiEndPoint}/gallery/photos`,
  storeVersion: `${apiEndPoint}/store/version`,
  storeApps: `${apiEndPoint}/store/apps`,
};

export const XTERM_THEME = {
  red: "#ff8888",
  yellow: "#fdd587",
  green: "#51c49f",
};

export const STORE_CDN_BASE_URL =
  "https://cdn.jsdelivr.net/gh/bbbottle/bbapp-store";

export const npmPkgSrc =
  "https://github.com/bbbottle/zjh.im/packages/524773?version=";
export const coverImgSrc =
  "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/5e3ffe8bdcaaca180c846aa2-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200209204106.jpg?x-oss-process=style/webp";
export const tmpWebpUrlSuffix = "?x-oss-process=style/webp";

export const cuzDisSDKUrl = "https://bbcusdis.vercel.app/js/cusdis.es.js";
export const cuzDisHostURL = "https://bbcusdis-tsexyycvt-zjh-im.vercel.app";
export const cuzDisAppID = "4b45567d-add2-4533-9f4a-66f53c7617d3";
export const cuzDisWidgetDomID = "cusdis_thread";
