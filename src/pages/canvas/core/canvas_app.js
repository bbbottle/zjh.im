import React from 'react';
import {EMPTY_APP_ID} from "../const";

export class Zone {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  isLargerThan = (zone) => {
    return this.width > zone.width && this.height > zone.height;
  }

  isSmallerThan = (zone) => {
    return this.width < zone.width && this.height < zone.height;
  }
}

export class HostZone extends Zone {
  constructor(left, top, width, height) {
    super(width, height);
    this.left = left;
    this.top = top;
  }
}

export class LivableZone {
  constructor(minZone, maxZone) {
    this.minZone = minZone;
    this.maxZone = maxZone;
  }

  static create(widthRang, heightRange) {
    const [minW, maxW] = widthRang;
    const [minH, maxH] = heightRange;
    const minZone = new Zone(minW, minH);
    const maxZone = new Zone(maxW, maxH);
    return new LivableZone(minZone, maxZone);
  }
}

/**
 * 画布应用
 */
export class CanvasApp {
  constructor(
    id,
    name,
    Icon,
    CompClass,
    description,
    livableZone
  ) {
    this.id = id;
    this.name = name;
    this.icon = Icon;
    this.description = description;
    this.livableZone = livableZone;
    this.Component = CompClass;

    this.active = false;
  }

  canLiveIn = (hostZone) => {
    return this.livableZone.minZone.isSmallerThan(hostZone)
      && this.livableZone.maxZone.isLargerThan(hostZone);
  }

  isEmpty = () => {
    return this.id === EMPTY_APP_ID;
  };

  renderIcon = () => {
    const Icon = this.icon;
    return <Icon />
  };

  render = (props) => {
    const Component = this.Component;
    return <Component {...props} />
  }
}