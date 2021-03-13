import React from 'react';
import cn from 'classnames';
import {
  InvalidIcon,
  FigmaIcon,
  PhotoIcon
} from '@bbbottle/bbicons';

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
import {SlotMachine} from "../../../components/slot_machine";

const rendererMatcherMatrix = [
  [FigmaBoard, showDesignBox],
  [PhotoBox, showPhotoBox]
];

export const boxValidator = (boxProps) => {
  return showDesignBox(boxProps) || showPhotoBox(boxProps);
};

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

const UNKNOWN = 'unknown';
const AvailableApplicationsDescription = [{
  id: 'design',
  name: 'Design',
  matcher: showDesignBox,
  renderer: () => <FigmaIcon />,
}, {
  id: 'photos',
  name: 'Photos',
  matcher: showPhotoBox,
  renderer: () => <PhotoIcon />,
}, {
  id: UNKNOWN,
  matcher: () => true,
  renderer: () => <InvalidIcon />,
}];

const getMatchedAppByBoxStyle = (style) => {
  return AvailableApplicationsDescription.find(app => app.matcher(style));
};

export const previewBoxRenderer = (style) => {
  const app = getMatchedAppByBoxStyle(style);
  const active = app.id !== UNKNOWN;

  const sizeStr = `${style.width}px ${style.height}px`;
  const offset = 100;
  const slotMachineSize = 24;
  const showSlotMachine = style.width > slotMachineSize && style.height > slotMachineSize;
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
          {
            showSlotMachine && (
              <SlotMachine
                size={slotMachineSize}
                luckyPatternId={app.id}
                patterns={AvailableApplicationsDescription}
              />
            )
          }
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