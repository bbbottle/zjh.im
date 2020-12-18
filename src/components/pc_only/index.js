import React from 'react';

export const PcOnly = (props) => {
  const { matches: isPc } = matchMedia('(min-width: 500px)'); // Not sure about that~
  return isPc ? props.children : null;
};