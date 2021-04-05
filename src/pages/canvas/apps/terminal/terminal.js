import React, { useRef, useEffect, useState } from "react";
import { startShell } from "@bbbottle/bbterm";

import { buildCommandsByProps } from "./commands";

export default (props) => {
  const termWrapper = useRef(null);

  useEffect(() => {
    if (termWrapper.current) {
      startShell(termWrapper.current, buildCommandsByProps(props));
    }
  }, []);

  return (
    <div
      style={{
        width: props.windowBodyWidth,
        height: props.windowBodyHeight,
      }}
      ref={termWrapper}
    />
  );
};
