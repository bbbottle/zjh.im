import React, { useState } from 'react';
import {ToolBar, WhiteBoard} from './white_board'
import {TickLoader} from "../../../components/spinner";

export const FigmaDesignApp = (props) => {
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
        width={width - 2}
        frameBorder='none'
        height={height - 2}
        style={{position: 'absolute'}}
        src={FigmaLiveAddr}
      />
      { loading && <TickLoader absCenter /> }
      <ToolBar {...props} />
    </WhiteBoard>
  )
}
