import React from "react";
import { IS_PC } from "../../utils/device_detect";
import { Nav } from "../../components/nav";

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
  const navItems = list.map((l) => ({
    content: l.title,
    id: l.id,
  }));

  return <Nav title="最近" items={navItems} onItemClick={scrollToArticle} />;
};
