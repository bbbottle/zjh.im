import React, { useRef, useEffect } from "react";
import { startShell } from "@bbbottle/bbterm";
import { connectShellToStore } from "./connect_to_store";

export default (props) => {
  const termWrapper = useRef(null);
  const { addCanvasApp, addSitePage } = props;

  useEffect(() => {
    const commands = [
      {
        name: "exit",
        handler: async () => {
          props.destroy();
          return Promise.resolve();
        },
      },
    ];

    if (termWrapper.current) {
      startShell(termWrapper.current, commands, {
        xtermConfig: props.xtermConfig || {},
        onBeforeRepl: async (shell) => {
          await connectShellToStore(shell, {
            addCanvasApp,
            addSitePage,
          });
        },
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
