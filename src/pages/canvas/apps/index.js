import React from 'react';
import {Photos} from "../../photos";
import {WhiteBoardWithToolbar} from "./white_board";

export const PhotosApp = (props) => {
  return (
    <WhiteBoardWithToolbar {...props}>
      <Photos
        hideProgressIndicator
      />
    </WhiteBoardWithToolbar>
  )
}

export { FigmaDesignApp } from './figma_design';