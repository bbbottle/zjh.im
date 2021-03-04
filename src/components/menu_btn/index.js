import React from 'react';
import cn from 'classnames';

import { LogoIcon } from '@bbbottle/bbicons';

import BtnStyle from './index.module.scss';

export const MenuBtn = ({
  onClick,
  className,
  style,
  hidden,
}) => {
  return (
    <LogoIcon
      style={style}
      className={cn(BtnStyle.MenuButton, className, {
        [BtnStyle.show]: !hidden
      })}
      onClick={onClick}
    />
  )
};