export const createArticleIntersectionObserver = (articleVisibilityUpdater) => {
  const handleIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !entry.target) {
        return;
      }

      articleVisibilityUpdater((visibilityMap) => {
        const id = entry.target.dataset.id;
        if (visibilityMap[id]) { return;}
        visibilityMap[id] = true;
      })
    })
  };

  const options = { threshold: 1 };

  return new IntersectionObserver(
    handleIntersectionChange,
    options
  );
};

