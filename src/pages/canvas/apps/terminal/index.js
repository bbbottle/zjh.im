import React, { useRef, useEffect } from 'react';
import { startShell } from '@bbbottle/bbterm';
import Style from './term_wrapper.scss';

export const TerminalApp = (props) => {
  const termWrapper = useRef(null)
  useEffect(() => {
    if (termWrapper.current) {
      startShell(termWrapper.current, [{
        name: 'hello',
        handler: async (shell) => {
          return shell.printLine('coming soon...')
        }
      }, {
        name: 'exit',
        handler: async () => {
          props.destroy();
          return Promise.resolve();
        }
      }]);
    }
  }, [])
  return (
    <div
      className={Style.termWrapper}
      ref={termWrapper}
    />
  );
}
