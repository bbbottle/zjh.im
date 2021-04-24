import React from "react";
import classnames from "classnames";
import style from "./index.scss";
import COMMON_STYLE from "../../style/common.scss";

export const Nav = (props) => {
  const { className, title, items, onItemClick = () => null } = props;

  return (
    <ul
      data-title={title}
      className={classnames(
        className,
        style.nav,
        COMMON_STYLE.fixedWidgetsUnderLogo
      )}
    >
      {items.map(({ id, text }, index) => {
        return (
          <li
            className={style.navItem}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(id, items[index]);
            }}
          >
            {text}
          </li>
        );
      })}
    </ul>
  );
};
