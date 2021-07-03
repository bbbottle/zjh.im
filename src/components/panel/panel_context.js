import React, { useState } from "react";

export const PanelContext = React.createContext(null);

export const PanelContextLayer = (props) => {
  const { children } = props;
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelContent, setPanelContent] = useState(null);
  const PanelContextValue = {
    panelVisible,
    setPanelVisible,

    panelContent,
    setPanelContent,

    resetPanel: () => {
      setPanelContent(null);
      setPanelVisible(false);
    },
  };
  return (
    <PanelContext.Provider value={PanelContextValue}>
      {children}
    </PanelContext.Provider>
  );
};
