import React, { useState, useEffect } from 'react';
import {TickLoader} from '../spinner';

export const Await = (props) => {
  const {
    promise,
    children
  } = props;

  const [result, setResult] = useState(null);

  useEffect(() => {
    promise.then((res) => {
      setResult(res);
    })
  }, []);

  return result
    ? children(result)
    : <TickLoader absCenter />
};
