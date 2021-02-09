import React from 'react';
import { useState, useCallback } from 'react';
import immer from "immer"

const produce = immer.produce;

export const useSafeState = (s) => {
  const [state, setState] = useState(s);

  return [state, useCallback(updater => {
    setState(produce(updater))
  }, [])];
}

