import React, { useRef, useEffect } from "react";
import { startShell } from "@bbbottle/bbterm";
import { connectInstallToStore } from "./connect_to_store";
import { AppStore } from "../../store/app_store";

export default (props) => {
  const termWrapper = useRef(null);
  const { addCanvasApp, addSitePage } = props;

  useEffect(async () => {
    const commands = [
      {
        name: "exit",
        handler: async () => {
          props.destroy();
          return Promise.resolve();
        },
      },
      connectInstallToStore({
        addCanvasApp,
        addSitePage,
      }),
      ...AppStore.getInstalledCommands(),
    ];

    if (termWrapper.current) {
      startShell(termWrapper.current, commands, {
        xtermConfig: props.xtermConfig || {},
      });
    }
  }, []);

  return (
    <div
      className={props.className || ""}
      style={{
        width: props.termWidth || props.windowBodyWidth,
        height: props.termHeight || props.windowBodyHeight,
      }}
      ref={termWrapper}
    />
  );
};
