import React from 'react';

import {
  AboutIcon,
  PhotoIcon,
  BoxIcon,
  TextIcon,
} from '@bbbottle/bbicons';

import { Photos } from './photos';
import { CanvasPage } from './canvas';
import { AboutPage } from './about';
import { Articles } from './articles';
import { IS_PC } from '../utils/device_detect';

const pagesConfig = {
  about: {
    title: '关于',
    icon: AboutIcon,
    component: AboutPage,
  },
  canvas: {
    title: '画布 [beta]',
    icon: BoxIcon,
    component: CanvasPage,
  },
  articles: {
    title: '文章',
    icon: TextIcon,
    component: Articles,
  },
  photos: {
    title: '相片',
    icon: PhotoIcon,
    component: Photos,
  }
};

const MOBILE_PAGES = [
  pagesConfig.photos,
  pagesConfig.articles,
  pagesConfig.about,
];

const PC_PAGES = [
  pagesConfig.canvas,
  pagesConfig.photos,
  pagesConfig.articles,
  pagesConfig.about,
];

export const pages = IS_PC ? PC_PAGES : MOBILE_PAGES;
