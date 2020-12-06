import React from 'react';
import classnames from 'classnames';
import { BoxCanvas } from '@bbbottle/box-canvas'
import {
  staticBoxRenderer,
  previewBoxRenderer,
  clearButtonRenderer
} from './renderer/';
import CLS from './index.scss';

export const CanvasPage = (props) => {
  return (
    <div className={classnames(CLS.canvasPage, props.className)}>
      <BoxCanvas
        attachLineGutter={4}
        clearButtonRenderer={clearButtonRenderer}
        staticBoxRenderer={staticBoxRenderer}
        previewBoxRenderer={previewBoxRenderer}
      />
    </div>
  )
}