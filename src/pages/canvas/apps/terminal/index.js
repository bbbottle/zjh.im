import React, { useRef, useEffect } from 'react';
import { startShell } from '@bbbottle/bbterm';

export const TerminalApp = (props) => {
  const termWrapper = useRef(null)
  const { boxStyle } = props;
  useEffect(() => {
    if (termWrapper.current) {
      startShell(termWrapper.current);
    }
  }, [])
  return (
    <div
      style={{ width: boxStyle.width, height: boxStyle.height - 38 }}
      ref={termWrapper}
    />
  );
}
