import React from 'react';
import cn from 'classnames';
import CLS from './renderer.scss';

import {
  showDesignBox,
  showPhotoBox,
  falsyMatcher,
} from './matcher';

import {
  emptyRender,
  FigmaBoard,
  PhotoBox,
  DelBtn
} from './renderer';

const rendererMatcherMatrix = [
  [FigmaBoard, showDesignBox],
  [PhotoBox, showPhotoBox]
];

const getBoxRenderer = (matrix, props) => {
  const defaultRendererMatcherPair = [emptyRender, falsyMatcher];
  const [ renderer ] = matrix.find(([r,m]) => m(props))
  || defaultRendererMatcherPair;

  return renderer;
}

export const staticBoxRenderer = (props) => {
  const Renderer = getBoxRenderer(rendererMatcherMatrix, props)
  return <Renderer {...props} />
};

export const previewBoxRenderer = (style) => {
  const active = showDesignBox(style)
    || showPhotoBox(style);

  const sizeStr = `${style.width}px ${style.height}px`;
  const offset = 100;
  return (
    <>
      <div
        style={{
          ...style,
          width: style.width + 2 * offset,
          height: style.height + 2 * offset,
          left: style.left - offset,
          top: style.top - offset,
          cursor: 'grabbing',
          zIndex: 1,
        }}
      />
      <div
        style={style}
        className={cn(CLS.previewBox, { [CLS.active]: active })}
        data-size={sizeStr}
      />
    </>
  );
};

export const clearButtonRenderer = (props) => {
  return null;
  // return (
  //   <DelBtn
  //     onClick={props.clear}
  //     className={cn(CLS.black, CLS.big)}
  //     style={{
  //       position: "absolute",
  //       right: '50%',
  //       bottom: 50
  //     }}
  //   />
  // )
}