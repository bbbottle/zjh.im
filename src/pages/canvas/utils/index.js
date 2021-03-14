export const getQuadrantByStartEndPos = (startPos, endPos) => {
  const [x1, y1] = startPos;
  const [x2, y2] = endPos;
  if (x1 < x2 && y1 > y2) {
    return 1;
  }
  if (x1 > x2 && y1 > y2) {
    return 2;
  }
  if (x1 > x2 && y1 < y2) {
    return 3;
  }
  if (x1 < x2 && y1 < y2) {
    return 4;
  }
}

export const quadrantVerticalFlip = (quadrant) => {
  const target = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  }
  return target[quadrant];
}

export const quadrantHorizontalFlip = (quadrant) => {
  const target = {
    1: 2,
    2: 1,
    3: 4,
    4: 3,
  }
  return target[quadrant];
}
