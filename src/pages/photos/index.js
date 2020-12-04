import React from 'react';

import { Get } from '../../utils/req';
import { createClickHandler } from '../../utils/evt';

import { PagingStateManager as PagingManager } from '../../components/paging';
import { TickLoader } from '../../components/spinner';
import Img from '../../components/img';

import {
  tmpBlurryThumbnailUrlSuffix,
  tmpWebpUrlSuffix,
  apiURL
} from '../../constants';

import cls from './index.scss';

const toWebpUrl = (src) => `${src}${tmpWebpUrlSuffix}`;
const toBlurryImgUrl = (src) => `${src.replace(tmpWebpUrlSuffix, '')}${tmpBlurryThumbnailUrlSuffix}`;

const renderBlurryThumbnail = (originUrl) => {
  return (
    <img
      className={cls.img}
      src={toBlurryImgUrl(originUrl)}
      style={{
        filter: 'opacity(0.2)',
      }}
    />
  );
}

export const Photos = (props) => {
  const {
    Spinner = <TickLoader absCenter />
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
                next,
                prev,
              }) => {
              const photo = currentPageData[0];
              return (
                <div className={cls.photoGallery}>
                  <Img
                    className={cls.img}
                    src={toWebpUrl(photo.url)}
                    onClick={createClickHandler({ onRightClick: next, onLeftClick: prev })}
                    loadingViewRenderer={renderBlurryThumbnail}
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
