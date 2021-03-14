import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import CLS from './style.scss';

export const DelBtn = (props) => {
  return (
    <button
      style={props.style || {}}
      className={cn(CLS.delete, props.className)}
      onClick={props.onClick}
    >
      ✕
    </button>
  )
};

export const ToolBar = (props) => {
  return (
    <div className={CLS.toolbar}>
      <DelBtn onClick={props.remove} />
    </div>
  )
};

export const WhiteBoard = (props) => {
  const {
    padding = 0,
    disableBoarder
  } = props;

  const style = {
    background: 'white',
    width: '100%',
    height: '100%',
    padding,
    cursor: 'default',
    border: disableBoarder
      ? 'unset'
      : 'solid 1px #ddd',
  }
  return (
    <div style={style}>{props.children}</div>
  )
}

export const WhiteBoardWithToolbar = (props) => {
  const { children, ...rest } = props;
  return (
    <WhiteBoard>
      <ToolBar {...rest} />
      {children}
    </WhiteBoard>
  )
}

WhiteBoard.propTypes = {
  padding: PropTypes.bool.isRequired,
  disableBoarder: PropTypes.bool,
}

WhiteBoard.defaultProps = {
  disableBoarder: false,
}