import React from 'react';

import {
  RulerIcon,
  AboutIcon
} from '@bbbottle/bbicons';

import { CanvasPage } from './canvas';
import { AboutPage } from './about';

const pagesConfig = {
  about: {
    title: '关于',
    icon: AboutIcon,
    component: AboutPage,
  },
  canvas: {
    title: '画布',
    icon: RulerIcon,
    component: CanvasPage,
  }
};

export const pages = [
  pagesConfig.canvas,
  pagesConfig.about,
]
