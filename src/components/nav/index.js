import React, { useState } from "react";
import classnames from "classnames";
import style from "./index.scss";
import COMMON_STYLE from "../../style/common.scss";

const NAV_ITEM_TYPE = {
  BUTTON: "button",
  LINK: "link",
  UNKNOWN: "unknown",
};

export const Nav = (props) => {
  const { className, title, items, onItemClick = () => null } = props;
  const [activeId, setActiveId] = useState(null);

  return (
    <ul
      data-title={title}
      className={classnames(
        className,
        style.nav,
        COMMON_STYLE.fixedWidgetsUnderLogo
      )}
    >
      {items.map(({ id, type, content }, index) => {
        const isButtonItem = type === NAV_ITEM_TYPE.BUTTON;
        return (
          <li
            className={classnames(style.navItem, {
              [style.activeNavItem]: isButtonItem && id === activeId,
            })}
            onClick={(e) => {
              e.stopPropagation();
              if (isButtonItem) {
                setActiveId(id);
              }
              onItemClick(id, items[index]);
            }}
          >
            {content}
          </li>
        );
      })}
    </ul>
  );
};
