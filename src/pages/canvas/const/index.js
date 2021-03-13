import {
  FigmaIcon,
  PhotoIcon
} from '@bbbottle/bbicons';

import {
  PhotosApp,
  FigmaDesignApp
} from "../apps";

/**
 * 画布应用配置信息
 */
export const CANVAS_APPLICATIONS = [{
  id: 'photo',
  name: 'Photo',
  icon: PhotoIcon,
  component: PhotosApp,
  description: 'photo gallery',
  widthRange: [500, 600],
  heightRange: [500, 600],
}, {
  id: 'fgm-design',
  name: 'zjh design live',
  icon: FigmaIcon,
  component: FigmaDesignApp,
  description: 'photo gallery',
  widthRange: [600, 800],
  heightRange: [600, 700],
}];