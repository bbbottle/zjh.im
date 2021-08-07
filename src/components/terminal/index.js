import React, { Suspense } from "react";
import { TVNoiseLayer } from "../noise";
import { XTERM_THEME } from "../../constants";

const Terminal = React.lazy(() => import("./terminal"));

export const TerminalApp = (props) => {
  const {
    boxStyle,
    termWidth,
    termHeight,
    className,
    xtermConfig = { theme: XTERM_THEME },
  } = props;
  const fb = (
    <TVNoiseLayer
      className={className}
      width={termWidth || boxStyle.width}
      height={termHeight || boxStyle.height - 38}
      opacity={0.5}
    />
  );

  return (
    <Suspense fallback={fb}>
      <Terminal {...props} xtermConfig={xtermConfig} />
    </Suspense>
  );
};
