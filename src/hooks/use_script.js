import { useEffect } from "react";

const scriptsCache = new Set();
const useScript = (url) => {
  useEffect(() => {
    if (scriptsCache.has(url)) {
      return;
    }
    scriptsCache.add(url);
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);
  }, [url]);
};

export default useScript;
