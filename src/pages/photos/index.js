import React from "react";
import useSWR from "swr";
import classnames from "classnames";

import { preloadImg } from "../../utils/req";
import { createClickHandler } from "../../utils/evt";

import { PagingStateManager as PagingManager } from "../../components/paging";
import { TickLoader } from "../../components/spinner";
import { TickIndicator } from "../../components/draggable_tick_indicator";
import Img from "../../components/img";

import { tmpWebpUrlSuffix, apiURL } from "../../constants";

import cls from "./index.scss";
import COMMON_STYLE from "../../style/common.scss";
import { IS_PC } from "../../utils/device_detect";

const toWebpUrl = (src) => `${src}${tmpWebpUrlSuffix}`;

let cachedImg = null;

export const Photos = (props) => {
  const { hideProgressIndicator } = props;

  const { data, error } = useSWR(apiURL.photos, {
    revalidateOnFocus: false,
  });

  if (error) {
    return null;
  }

  if (!data) {
    return <TickLoader absCenter />;
  }
  return (
    <PagingManager data={data} pageSize={1} infiniteLoopMode>
      {({
        currentPageData,
        currentPageIndex,
        nextPageData,
        gotoPage,
        next,
        prev,
      }) => {
        const photo = currentPageData[0];
        const nextImgSrc = toWebpUrl(nextPageData[0].url);
        preloadImg(nextImgSrc).then((next) => {
          cachedImg = next;
        });
        return (
          <div className={classnames(cls.photoGallery)}>
            <div className={COMMON_STYLE.fixedWidgetsUnderLogo}>
              {IS_PC && !hideProgressIndicator && (
                <TickIndicator
                  total={data.length}
                  current={currentPageIndex}
                  onDrop={gotoPage}
                  onClick={(e, i) => {
                    gotoPage(i);
                  }}
                />
              )}
            </div>
            <Img
              className={cls.img}
              src={toWebpUrl(photo.url)}
              onClick={createClickHandler({
                onRightClick: next,
                onLeftClick: prev,
              })}
            />
          </div>
        );
      }}
    </PagingManager>
  );
};
