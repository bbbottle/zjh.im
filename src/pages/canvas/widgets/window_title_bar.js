import React from 'react';
// import PropTypes from 'prop-types';
import Cls from 'classnames';

import Style from './window.scss';

import { IconText } from "../../../components/icon_text";

export const WindowOptionButton = (props) => {
  const {
    className,
    onClick,
    title,
  } = props;

  const classnames = Cls(className, Style.windowOptionButton);
  return (
    <button
      title={title}
      onClick={onClick}
      className={classnames}
    />
  )
};

export const WindowTitleBar = (props) => {
  const noop = () => null;
  const {
    onCloseBtnClick = noop,
    onMinimizeBtnClick = noop,
    onZoomBtnClick = noop,
    icon = null,
    title = '',
  } = props;

  return (
    <div className={Style.windowTitleBar}>
      <div className={Style.windowTitle}>
        <IconText
          icon={icon}
          text={title}
        />
      </div>
      <div className={Style.windowOptionButtonGroup}>
        <WindowOptionButton
          title="close"
          className={Style.close}
          onClick={onCloseBtnClick}
        />
        <WindowOptionButton
          title="minimize"
          className={Style.minimize}
          onClick={onMinimizeBtnClick}
        />
        <WindowOptionButton
          title="zoom"
          className={Style.zoom}
          onClick={onZoomBtnClick}
        />
      </div>
    </div>
  )
}