import cn from "classnames";
import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";

import { TickLoader } from "../../components/spinner";
import { apiURL } from "../../constants";
import { useSafeState } from "../../hooks/use_safe_state";
import { createArticleIntersectionObserver } from "./article_intersection_observer";
import { LatestArticleTitles } from "./latest_article_titles";
import { Article } from "./article";

import CLS from "./index.scss";
import { CommentSDKLayer } from "./comment_sdk";
import { PanelContext } from "../../components/panel/panel_context";
import { Panel } from "../../components/panel/panel";

export const Articles = () => {
  const { data, error } = useSWR(apiURL.articles, {
    revalidateOnFocus: false,
  });

  const [observer, initObserver] = useState(null);

  const [
    articleDetailVisibilityMap,
    articleDetailVisibilityUpdater,
  ] = useSafeState({});

  const { setPanelVisible } = useContext(PanelContext);

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
    <CommentSDKLayer>
      <LatestArticleTitles articles={data.articles} />
      <div
        className={cn(CLS.articles)}
        onClick={() => {
          setPanelVisible(false);
        }}
      >
        {data.articles.map((article) => (
          <Article
            showDetail={articleDetailVisibilityMap[article.id]}
            obs={observer}
            {...article}
          />
        ))}
      </div>
      <Panel />
    </CommentSDKLayer>
  );
};
