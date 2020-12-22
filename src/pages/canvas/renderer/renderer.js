import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { TickLoader } from '../../../components/spinner';
import { TVNoiseLayer } from '../../../components/noise';
import Img from '../../../components/img';

import CLS from './renderer.scss';
import {Photos} from '../../photos';

export const WhiteBoard = (props) => {
  const style = {
    background: 'white',
    width: '100%',
    height: '100%',
    padding: props.padding || 0,
    cursor: 'default',
    border: props.disableBorder
      ? 'unset'
      : 'solid 1px #ddd',
  }
  return (
    <div style={style}>{props.children}</div>
  )
}

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

ToolBar.propTypes = {
  remove: PropTypes.func.isRequired,
}

export const PhotoBox = (props) => {
  return (
    <WhiteBoard>
      <ToolBar {...props} />
      <Photos Spinner={<TVNoiseLayer {...props} />} />
    </WhiteBoard>
  );
}

export const FigmaBoard = (props) => {
  const FigmaLiveAddr = "https://www.figma.com/embed?" +
    "embed_host=share&" +
    "url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNqS0N6THcwmfvK3QIn9crW%2FHOME%3Fnode-id%3D0%253A1&" +
    "chrome=DOCUMENTATION";

  const {
    width, height
  } = props;

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  }

  return (
    <WhiteBoard>
      <iframe
        onLoad={handleLoad}
        width={width}
        frameBorder='none'
        height={height}
        style={{position: 'absolute'}}
        src={FigmaLiveAddr}
      />
      { loading && <TickLoader absCenter /> }
      <ToolBar {...props} />
    </WhiteBoard>
  )
}
export const emptyRender = () => null;
export const DesignFrame = (props) => {
  return null;
}