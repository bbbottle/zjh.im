import React, { useRef, useEffect, useState } from "react";
import { startShell } from "@bbbottle/bbterm";

import { buildCommandsByProps } from "./commands";

export default (props) => {
  const termWrapper = useRef(null);

  useEffect(() => {
    if (termWrapper.current) {
      startShell(termWrapper.current, buildCommandsByProps(props), {
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
