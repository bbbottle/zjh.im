import { useContext } from "react";
import { PanelContext } from "./panel_context";

export { Panel } from "./panel";

export const usePanel = () => {
  const { setPanelVisible, setPanelContent } = useContext(PanelContext);
  return {
    showPanel: (content) => {
      if (content) {
        setPanelContent(content);
      }
      setPanelVisible(true);
    },
    hidePanel: () => {
      setPanelVisible(false);
    },
    resetPanel: () => {
      setPanelVisible(false);
      setPanelContent(null);
    },
  };
};
