import cn from "classnames";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

import { TickLoader } from "../../components/spinner";
import { apiURL } from "../../constants";
import { useSafeState } from "../../hooks/use_safe_state";
import { createArticleIntersectionObserver } from "./article_intersection_observer";
import { LatestArticleTitles } from "./latest_article_titles";
import { Article } from "./article";

import CLS from "./index.scss";

export const Articles = () => {
  const { data, error } = useSWR(apiURL.articles, {
    revalidateOnFocus: false,
  });

  const [observer, initObserver] = useState(null);

  const [
    articleDetailVisibilityMap,
    articleDetailVisibilityUpdater,
  ] = useSafeState({});

  useEffect(() => {
    initObserver(
      createArticleIntersectionObserver(articleDetailVisibilityUpdater)
    );
  }, []);

  if (error) {
    return null;
  }
  if (!data) {
    return <TickLoader absCenter />;
  }

  return (
    <>
      <LatestArticleTitles articles={data.articles} />
      <div className={cn(CLS.articles)}>
        {data.articles.map((article) => (
          <Article
            showDetail={articleDetailVisibilityMap[article.id]}
            obs={observer}
            {...article}
          />
        ))}
      </div>
    </>
  );
};
