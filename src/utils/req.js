export const preloadImg = (imgSrc) => {
  let img = new Image();
  img.src = imgSrc;
  return new Promise((resolve) => {
    img.onload = (e) => {
      const target = e.target;
      if (target.complete && target.height) {
        resolve(target);
      }
    };
  });
};
