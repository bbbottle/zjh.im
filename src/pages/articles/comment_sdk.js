import useScript from "../../hooks/use_script";
import { cuzDisSDKUrl } from "../../constants";

export const CommentSDKLayer = (props) => {
  useScript(cuzDisSDKUrl);
  return props.children;
};
