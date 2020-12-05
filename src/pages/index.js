import React from 'react';

import {
  RulerIcon,
  AboutIcon,
  PhotoIcon,
} from '@bbbottle/bbicons';

import { Photos } from './photos';
import { CanvasPage } from './canvas';
import { AboutPage } from './about';

const pagesConfig = {
  about: {
    title: '关于',
    icon: AboutIcon,
    component: AboutPage,
  },
  canvas: {
    title: '画布 [beta]',
    icon: RulerIcon,
    component: CanvasPage,
  },
  photos: {
    title: '相片',
    icon: PhotoIcon,
    component: Photos,
  }
};

export const pages = [
  pagesConfig.photos,
  pagesConfig.canvas,
  pagesConfig.about
]
