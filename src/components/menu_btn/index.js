import React from 'react';
import cn from 'classnames';

import BtnStyle from './index.module.scss';

export const MenuBtn = ({
  onClick,
  className,
  style,
  hidden,
}) => {
  return (
    <button
      type="button"
      style={style}
      className={cn(BtnStyle.MenuButton, className, {
        [BtnStyle.show]: !hidden
      })}
      onClick={onClick}
    />
  );
};