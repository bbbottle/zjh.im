import React, { useRef, useEffect } from 'react';

/**
 * source: https://codepen.io/wifi/pen/novqA
 */
const noise = (ctx) => {
  const w = ctx.canvas.width
    , h = ctx.canvas.height
    , iData = ctx.createImageData(w, h)
    , buffer32 = new Uint32Array(iData.data.buffer)
    , len = buffer32.length

  let i = 0;
  for(; i < len;)
    buffer32[i++] = ((100 * Math.random())|0) << 24;

  ctx.putImageData(iData, 0, 0);
}

export const TVNoiseLayer = (props) => {
  const {
    height,
    width,
    className,
    opacity,
    style = {}
  } = props;
  const canvasRef = useRef(null);
  let canvas, ctx;

  const requestRef = React.useRef();

  const animate = time => {
    noise(ctx);
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d')
  }, [])

  useEffect(() => {
    if (height || width) {
      canvas.width = width;
      canvas.height = height;
      return;
    }
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    handleResize();
    window.onresize = handleResize;
  }, [])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      id="tv-noise-layer"
      style={Object.assign({
        pointerEvents: 'none',
        opacity,
      }, style)}
    />
  )
}