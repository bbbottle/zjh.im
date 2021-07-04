import { ossProcessParam, tmpWebpUrlSuffix } from "../constants";

export const toWebpUrl = (src) => {
  // has been processed already
  if (src.includes(ossProcessParam)) {
    return src;
  }
  return `${src}${tmpWebpUrlSuffix}`;
};
