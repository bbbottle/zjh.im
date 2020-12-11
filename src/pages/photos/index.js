import React, { useState } from 'react';
import classnames from 'classnames';

import { Get, preloadImg } from '../../utils/req';
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

export const Photos = (props) => {
  const {
    Spinner = <TickLoader absCenter />,
    className
  } = props;

  return (
    <Get url={apiURL.res}>
      {({ loading, data }) => {
        if (loading) {
          return Spinner;
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
      }}
    </Get>
  )
}
