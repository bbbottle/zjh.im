import React from "react";
import { IS_PC } from "../../utils/device_detect";
import CLS from "./index.scss";

const scrollToArticle = (id) => {
  const $article = document.querySelector(`[data-id="${id}"]`);
  $article.scrollIntoView({ block: "start" });
};

export const LatestArticleTitles = (props) => {
  if (!IS_PC) {
    return null;
  }

  const { articles = [], count = 3 } = props;

  const list = articles.slice(0, count);

  return (
    <ul className={CLS.latestArticlesTitles}>
      {list.map((a) => (
        <li
          onClick={(e) => {
            e.stopPropagation();
            scrollToArticle(a.id);
          }}
          className={CLS.latestArticlesTitle}
        >
          {a.title}
        </li>
      ))}
    </ul>
  );
};
