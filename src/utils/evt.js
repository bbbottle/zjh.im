export const createClickHandler = ({
  onLeftClick = () => null,
  onRightClick = () => null,
}) => (e) => {
  const middle = window.innerWidth / 2;
  const handler = e.clientX > middle ? onRightClick : onLeftClick;
  handler(e);
};
