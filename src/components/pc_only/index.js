import React from "react";
import { IS_PC } from "../../utils/device_detect";

export const PcOnly = (props) => {
  return IS_PC ? props.children : null;
};
