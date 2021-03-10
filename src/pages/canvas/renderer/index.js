import React from 'react';
import cn from 'classnames';
import CLS from './renderer.scss';
import TOKEN from '../../../style/token.scss';

import {
  showDesignBox,
  showPhotoBox,
  falsyMatcher,
} from './matcher';

import {
  emptyRender,
  FigmaBoard,
  PhotoBox,
} from './renderer';

const rendererMatcherMatrix = [
  [FigmaBoard, showDesignBox],
  [PhotoBox, showPhotoBox]
];

const getBoxRenderer = (matrix, props) => {
  const defaultRendererMatcherPair = [emptyRender, falsyMatcher];
  const [ renderer ] = matrix.find(([,m]) => m(props))
  || defaultRendererMatcherPair;

  return renderer;
}

export const staticBoxRenderer = (props) => {
  const Renderer = getBoxRenderer(rendererMatcherMatrix, props)
  return <Renderer {...props} />
};

const getMatchedAppByBoxStyle = (style) => {
  const availableApplications = [{
    name: 'Design',
    matcher: showDesignBox,
  }, {
    name: 'Photos',
    matcher: showPhotoBox,
  }];

  return availableApplications.find(app => app.matcher(style));
};

export const previewBoxRenderer = (style) => {
  const app = getMatchedAppByBoxStyle(style);
  const active = !!app;

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
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          className={cn(TOKEN.green2, TOKEN.docFont)}
        >
          {app ? app.name : null}
        </div>
      </div>
      <div
        style={style}
        className={cn(CLS.previewBox, { [CLS.active]: active })}
        data-size={sizeStr}
      />
    </>
  );
};

export const clearButtonRenderer = () => {
  return null;
}