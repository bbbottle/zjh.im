export const createClickHandler = ({
  onLeftClick = (n) => null,
  onRightClick = (n) => null
}) => (e) => {
  const middle = window.innerWidth / 2;
  const handler = e.clientX > middle
    ? onRightClick
    : onLeftClick;
  handler(e);
}
