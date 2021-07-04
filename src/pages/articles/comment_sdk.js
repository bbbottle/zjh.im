import useScript from "../../hooks/use_script";
import {
  cuzDisSDKCountConfig,
  cuzDisSDKCountUrl,
  cuzDisSDKUrl,
} from "../../constants";
import { useEffect } from "react";

export const CommentSDKLayer = (props) => {
  useScript(cuzDisSDKUrl);
  useScript(cuzDisSDKCountUrl, cuzDisSDKCountConfig);
  useEffect(() => {
    window.CUSDIS_COUNT && window.CUSDIS_COUNT.initial();
  }, []);
  return props.children;
};
