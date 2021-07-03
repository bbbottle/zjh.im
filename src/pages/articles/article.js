import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import cn from "classnames";

import { apiURL } from "../../constants";
import CLS from "./index.scss";
import { CommentEntry } from "./comment_entry";

export const Article = (props) => {
  const {
    title,
    description,
    slug,
    id,
    obs,
    showDetail: isDetailVisible,
    updated_at: updateTime,
  } = props;

  const [isShowDetail, showDetail] = useState(isDetailVisible);
  const detailURL = isShowDetail ? `${apiURL.article}?slug=${slug}` : null;
  const { data: detailInfo, error } = useSWR(detailURL, {
    revalidateOnFocus: false,
  });
  const articleContentEle = useRef(null);

  // did mount
  useEffect(() => {
    const ellipsisSign = "...";
    const isArticleEllipsis = description.endsWith(ellipsisSign);
    if (!isArticleEllipsis) {
      showDetail(true);
    }
  }, []);

  useEffect(() => {
    obs && obs.observe(articleContentEle.current);
  }, [obs]);

  useEffect(() => {
    if (isDetailVisible) {
      showDetail(true);
    }
  }, [isDetailVisible]);

  const content = (
    <div
      className={cn(CLS.contentWrapper, {
        [CLS.blurCover]: isShowDetail && !detailInfo,
        [CLS.description]: !isShowDetail,
        [CLS.clickable]: !isShowDetail,
      })}
      ref={articleContentEle}
      data-id={id}
      onClick={() => {
        showDetail(true);
      }}
      dangerouslySetInnerHTML={{
        __html: detailInfo ? detailInfo.content : description,
      }}
    />
  );

  if (error) {
    return null;
  }

  const date = new Date(updateTime).toLocaleDateString();
  return (
    <>
      <div className={CLS.article} data-id={id} data-title={title}>
        {content}
        <div className={CLS.info}>
          <span className={CLS.date}>{date}</span>
          <CommentEntry id={id} title={title} />
        </div>
      </div>
    </>
  );
};
