import { useEffect } from "react";

const scriptsCache = new Set();

/**
 * scripts 注入
 * @typedef {object.<string, string>} attributes
 * @param {string} url
 * @param {attributes} attributes
 */
const useScript = (url, attributes = {}) => {
  useEffect(() => {
    if (scriptsCache.has(url)) {
      return;
    }
    scriptsCache.add(url);
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    Object.entries(attributes).forEach(([k, v]) => {
      script.setAttribute(k, v);
    });

    document.body.appendChild(script);
  }, [url]);
};

export default useScript;
