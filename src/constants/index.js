const productionApiEndPoint = 'https://api.zjh.im';
// const developmentApiEndPoint = 'https://api-grocery.zjh-im.vercel.app';

export const apiEndPoint = productionApiEndPoint; // developmentApiEndPoint;
export const OSSEndPoint = 'https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com';

export const apiURL = {
  res: `${apiEndPoint}/res`,
  articles: `${apiEndPoint}/blog/articles`,
  article: `${apiEndPoint}/blog/article`,
  photos: `${apiEndPoint}/photo/gallery`,
};

export const coverImgSrc = 'https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/5e3ffe8bdcaaca180c846aa2-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200209204106.jpg?x-oss-process=style/webp';
export const yuQueAuth = {
  authorizationUri: 'https://www.yuque.com/oauth2/authorize',
  clientId: 'ab7VkEGAfseQU3ecnLNq',
  redirectUri: 'https://api.zjh.im/auth/editor',
  scope: 'doc,repo'
}
export const yuQueAuthUrl = 'https://www.yuque.com/oauth2/authorize?client_id=ab7VkEGAfseQU3ecnLNq&scope=doc,repo&redirect_uri=https://api.zjh.im/auth/editor&response_type=code';
export const GitHubProfileUrl = 'https://github.com/zjhou';
export const tmpBlurryThumbnailUrlSuffix = '?x-oss-process=style/thumbnail';
export const tmpWebpUrlSuffix = '?x-oss-process=style/webp';
export const FigmaLiveAddr = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNqS0N6THcwmfvK3QIn9crW%2FHOME%3Fnode-id%3D0%253A1&chrome=DOCUMENTATION";
// export const coverImgSrc = 'https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/JPEG%E5%9B%BE%E5%83%8F-6CDEC9FB33CD-1.jpeg?x-oss-process=style/webp';