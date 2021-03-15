import React from 'react';
import {Photos} from "../../photos";
import {WhiteBoardWithToolbar} from "./white_board";

export const PhotosApp = (props) => {
  return (
    <Photos
      hideProgressIndicator
    />
  )
}

export { FigmaDesignApp } from './figma_design';

export const EmptyApp = () => null;

export { AppPreviewer } from './app_previewer';