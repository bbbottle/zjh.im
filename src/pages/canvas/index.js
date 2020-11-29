import React from 'react';
import { BoxCanvas } from '@bbbottle/box-canvas'
import {
  staticBoxRenderer,
  previewBoxRenderer,
  clearButtonRenderer
} from './renderer/';
import CLS from './index.scss';

export const CanvasPage = () => {
  return (
    <div className={CLS.canvasPage}>
      <BoxCanvas
        attachLineGutter={4}
        clearButtonRenderer={clearButtonRenderer}
        staticBoxRenderer={staticBoxRenderer}
        previewBoxRenderer={previewBoxRenderer}
      />
    </div>
  )
}