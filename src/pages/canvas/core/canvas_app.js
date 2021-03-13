import React from 'react';

class Zone {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class HostZone extends Zone {
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

  render(props) {
    const Component = this.Component;
    return <Component {...props} />
  }
}