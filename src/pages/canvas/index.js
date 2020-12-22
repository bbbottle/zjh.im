import React from 'react';
import classnames from 'classnames';
import { BoxCanvas } from '@bbbottle/box-canvas'
import {
  staticBoxRenderer,
  previewBoxRenderer,
  clearButtonRenderer
} from './renderer/';
import CLS from './index.scss';

export const CanvasPage = () => {
  return (
    <div className={classnames(CLS.canvasPage)}>
      <BoxCanvas
        clearButtonRenderer={clearButtonRenderer}
        staticBoxRenderer={staticBoxRenderer}
        previewBoxRenderer={previewBoxRenderer}
      />
    </div>
  )
}