import React from 'react';
import cn from 'classnames';
import CLS from './style.scss';
import TOKEN from "../../../style/token.scss";
import {AppAxis} from "./app_axis";
import {AbsolutePositionedBox} from "./absolute_positioned_box";
import {getQuadrantByStartEndPos} from "../utils";

export const AppPreviewer = (props) => {
  const {
    boxInfo,
    availableApp,
  } = props;

  const quadrant = getQuadrantByStartEndPos(boxInfo.startPos, boxInfo.endPos)
  const rightQuadSet = new Set([1, 4]);
  const topQuadSet = new Set([1, 2]);

  const [x0, y0] = boxInfo.startPos;
  const x = rightQuadSet.has(quadrant) ? x0 : x0 + 1;
  const y = topQuadSet.has(quadrant) ? y0 + 1 : y0;

  return (
    <>
      <AbsolutePositionedBox
        className={cn(
          CLS.previewBox,
          TOKEN.green2,
          TOKEN.docFont,
          { [CLS.active]: !availableApp.isEmpty() }
        )}
        quadrant={quadrant}
        fixedPointCoordinate={[x, y]}
        width={boxInfo.width}
        height={boxInfo.height}
      />
      {props.children}
      <AppAxis
        originCoordinate={boxInfo.startPos}
        cursorCoordinate={boxInfo.endPos}
      />
    </>
  );
};

