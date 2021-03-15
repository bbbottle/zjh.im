import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cls from 'classnames';

import {WindowTitleBar} from "./window_title_bar";
import Style from './window.scss';

const MinStyle = {
  width: 300,
  height: 38,
}

const NormStyle = {
  width: '100%',
  height: '100%',
};

export const Window = (props) => {
  const [isMinimized, minimize] = useState(false);
  const {
    style,
    children,
    onMinimizeBtnClick,
    onZoomBtnClick,
    ...rest
  } = props;
  return (
    <div
      className={Style.window}
      style={isMinimized ? MinStyle : NormStyle}
    >
      <WindowTitleBar
        onMinimizeBtnClick={(e) => {
          minimize(true);
          onMinimizeBtnClick && onMinimizeBtnClick(e);
        }}
        onZoomBtnClick={(e) => {
          minimize(false);
          onZoomBtnClick && onZoomBtnClick(e);
        }}
        {...rest}
      />
      <div className={Cls(Style.windowBody)}>
        {children}
      </div>
    </div>
  )
}
