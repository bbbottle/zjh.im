import React from "react";
import classnames from "classnames";

import { PagingStateManager as PagingManager } from "../../components/paging";
import { preloadImg } from "../../utils/req";
import COMMON_STYLE from "../../style/common.scss";
import { IS_PC } from "../../utils/device_detect";
import { TickIndicator } from "../../components/draggable_tick_indicator";
import cls from "./index.scss";
import Img from "../../components/img";
import { createClickHandler } from "../../utils/evt";
import { toWebpUrl } from "../../utils/oss_url";

let cachedImg = null;

export const Pager = (props) => {
  const { photos: data, hideProgressIndicator } = props;
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
