import React, { Suspense } from 'react';
import {TVNoiseLayer} from "../../../../components/noise";

const Terminal = React.lazy(() => import('./terminal'));

export const TerminalApp = (props) => {
  const { boxStyle } = props;
  const fb = (
    <TVNoiseLayer
      width={boxStyle.width}
      height={boxStyle.height - 38}
      opacity={.5}
    />
  )

  return (
    <Suspense
      fallback={fb}
    >
      <Terminal {...props} />
    </Suspense>
  )
}
