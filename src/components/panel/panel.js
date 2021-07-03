import classnames from "classnames";
import React, { useContext } from "react";
import { PanelContext } from "./panel_context";
import PanelStyle from "./panel.scss";
import GlobalStyle from "../../style/token.scss";

export const Panel = (props) => {
  const { panelVisible, panelContent } = useContext(PanelContext);
  return (
    <div
      className={classnames(PanelStyle.panel, GlobalStyle.gray3, {
        [PanelStyle.hide]: !panelVisible,
      })}
    >
      <div className={PanelStyle.panelContent}>{panelContent}</div>
    </div>
  );
};
