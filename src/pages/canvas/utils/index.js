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