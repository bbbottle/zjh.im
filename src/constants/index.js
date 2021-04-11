const productionApiEndPoint = "https://api.zjh.im";
// const developmentApiEndPoint = 'https://api-grocery.zjh-im.vercel.app';

export const apiEndPoint = productionApiEndPoint; // developmentApiEndPoint;

export const apiURL = {
  articles: `${apiEndPoint}/blog/articles`,
  article: `${apiEndPoint}/blog/article`,
  photos: `${apiEndPoint}/gallery/photos`,
  store: `${apiEndPoint}/store_version`,
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
