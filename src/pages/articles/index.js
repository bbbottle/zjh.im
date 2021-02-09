import React, { useState, useEffect } from 'react';
import useSWR from 'swr'
import cn from 'classnames';

import { TickLoader } from "../../components/spinner";
import { apiURL } from '../../constants';
import { PcOnly } from "../../components/pc_only";

import CLS from './index.scss';

export const Article = (props) => {
  const {
    title, description, slug, id
  } = props;

  const ellipsisSign = '...';
  const isArticleEllipsis = description.endsWith(ellipsisSign);
  const [isShowDetail, showDetail] = useState(false)
  const detailURL = isShowDetail ? `${apiURL.article}?slug=${slug}` : null;
  const { data: detailInfo, error } = useSWR(detailURL);

  useEffect(() => {
    if (!isArticleEllipsis) {
      showDetail(true);
    }
  }, []);

  const content = error
    ? "REQUEST ERROR :("
    : (
    <div
      className={cn(CLS.contentWrapper, {
        [CLS.blurCover]: isShowDetail && !detailInfo,
        [CLS.description]: !isShowDetail,
        [CLS.clickable]: !isShowDetail
      })}
      onClick={() => { showDetail(true); }}
      dangerouslySetInnerHTML={{
        __html: detailInfo ? detailInfo.content : description
      }}
    />
  );

  return (
    <>
      <div
        className={CLS.article}
        data-id={id}
        data-time={new Date(props.updated_at).toLocaleDateString()}
        data-title={title}
      >
        {content}
      </div>
    </>
  )
}

const scrollToArticle = (id) => {
  const $article = document.querySelector(`[data-id="${id}"]`);
  $article.scrollIntoView({
    block: 'start',
  })
}

const LatestArticleTitles = (props) => {
  const {
    articles = [],
    count = 3,
  } = props;
  const list = articles.slice(0, count)
  return (
    <PcOnly>
      <ul className={CLS.latestArticlesTitles}>
        {list.map(a => (
          <li
            onClick={() => {
              scrollToArticle(a.id);
            }}
            className={CLS.latestArticlesTitle}
          >
            {a.title}
          </li>
        ))}
      </ul>
    </PcOnly>
  )
};

export const Articles = (props) => {
  const { data, error } = useSWR(apiURL.articles);
  if (error) {
    return null
  }

  if (!data) {
    return <TickLoader absCenter />
  }

  return (
    <>
      <LatestArticleTitles articles={data.articles} />
      <div className={cn(CLS.articles, props.className)}>
        {data.articles.map((article) => <Article {...article} />)}
      </div>
    </>
  );
}