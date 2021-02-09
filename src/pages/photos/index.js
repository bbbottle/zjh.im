import React from 'react';
import useSWR from 'swr'
import classnames from 'classnames';

import { preloadImg } from '../../utils/req';
import { createClickHandler } from '../../utils/evt';

import { PagingStateManager as PagingManager } from '../../components/paging';
import { TickLoader } from '../../components/spinner';
import Img from '../../components/img';

import {
  tmpWebpUrlSuffix,
  apiURL
} from '../../constants';

import cls from './index.scss';

const toWebpUrl = (src) => `${src}${tmpWebpUrlSuffix}`;

let cachedImg = null;

export const Photos = () => {
  const { data, error } = useSWR(apiURL.photos);

  if (error) {
    return null;
  }

  if (!data) {
    return <TickLoader absCenter />
  }
  return (
    <PagingManager
      data={data}
      pageSize={1}
      infiniteLoopMode
    >
      {({
          currentPageData,
          nextPageData,
          next,
          prev,
        }) => {
        const photo = currentPageData[0];
        const nextImgSrc = toWebpUrl(nextPageData[0].url);
        preloadImg(nextImgSrc).then((next) => {cachedImg = next});
        return (
          <div
            className={classnames(cls.photoGallery)}
          >
            <Img
              className={cls.img}
              src={toWebpUrl(photo.url)}
              onClick={createClickHandler({ onRightClick: next, onLeftClick: prev })}
            />
          </div>
        )
      }}
    </PagingManager>
  )
}
