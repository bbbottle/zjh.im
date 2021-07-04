import React, { useState } from "react";

export const PanelContext = React.createContext({});

export const PanelContextLayer = (props) => {
  const { children } = props;
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelContent, setPanelContent] = useState(null);
  const PanelContextValue = {
    panelVisible,
    setPanelVisible,

    panelContent,
    setPanelContent,
  };
  return (
    <PanelContext.Provider value={PanelContextValue}>
      {children}
    </PanelContext.Provider>
  );
};
