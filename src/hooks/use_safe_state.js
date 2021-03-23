import React from "react";
import { useState, useCallback } from "react";
import { produce } from "immer";

export const useSafeState = (s) => {
  const [state, setState] = useState(s);

  return [
    state,
    useCallback((updater) => {
      setState(produce(updater));
    }, []),
  ];
};
