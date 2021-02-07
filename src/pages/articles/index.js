import React from 'react';
import cn from 'classnames';

import { Await } from '../../components/await';
import { get } from '../../utils/req';
import { apiURL } from '../../constants';
import CLS from './index.scss';
import { PcOnly } from "../../components/pc_only";

export const Article = (props) => {
  return (
    <div
      className={CLS.article}
      dangerouslySetInnerHTML={{__html: props.content}}
      data-time={new Date(props.updateTime).toLocaleDateString()}
      data-title={props.title}
    />
  )
}

const scrollToArticle = (articleTitle) => {
  const $article = document.querySelector(`[data-title="${articleTitle}"]`);
  $article.scrollIntoView({
    block: 'start',
  })
}

const LatestArticleTitles = (props) => {
  const {
    articles = [],
    count = 3,
  } = props;
  const titles = articles.slice(0, count).map(a => a.title);
  return (
    <PcOnly>
      <ul className={CLS.latestArticlesTitles}>
        {titles.map(t => (
          <li
            onClick={() => {
              scrollToArticle(t);
            }}
            className={CLS.latestArticlesTitle}
          >{t}</li>
        ))}
      </ul>
    </PcOnly>
  )
};

export const Articles = (props) => {
  return (
    <Await promise={get(apiURL.articles)}>
      {(articles) => {
        return (
          <>
            <LatestArticleTitles articles={articles} />
            <div className={cn(CLS.articles, props.className)}>
              {articles.map((article) => <Article {...article} />)}
            </div>
          </>
        );
      }}
    </Await>
  )
}