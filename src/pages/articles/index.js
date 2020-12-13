import React from 'react';
import cn from 'classnames';

import { Await } from '../../components/await';
import { get } from '../../utils/req';
import { apiURL } from '../../constants';
import CLS from './index.scss';

export const Article = (props) => {
  return (
    <div
      className={CLS.article}
      dangerouslySetInnerHTML={{__html: props.content}}
      data-title={props.title}
    />
  )
}

export const Articles = (props) => {
  return (
    <Await promise={get(apiURL.articles)}>
      {(articles) => {
        return (
          <div className={cn(CLS.articles, props.className)}>
            {articles.map((article) => <Article {...article} />)}
          </div>
        );
      }}
    </Await>
  )
}