import {
  FigmaIcon,
  PhotoIcon,
  InvalidIcon,
} from '@bbbottle/bbicons';

import {
  PhotosApp,
  EmptyApp,
  FigmaDesignApp
} from "../apps";

export const EMPTY_APP_ID = 'empty';

/**
 * 画布应用配置信息
 */
export const CANVAS_APPLICATIONS = [{
  id: EMPTY_APP_ID,
  name: 'empty',
  icon: InvalidIcon,
  component: EmptyApp,
  description: 'nothing',
  widthRange: [0, 300],
  heightRange: [0, 300],
}, {
  id: 'photo',
  name: 'Photo',
  icon: PhotoIcon,
  component: PhotosApp,
  description: 'photo gallery',
  widthRange: [300, 500],
  heightRange: [300, 500],
}, {
  id: 'fgm-design',
  name: 'zjh.im design live',
  icon: FigmaIcon,
  component: FigmaDesignApp,
  description: 'photo gallery',
  widthRange: [500, 800],
  heightRange: [500, 600],
}];