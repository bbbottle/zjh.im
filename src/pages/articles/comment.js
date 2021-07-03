import React, { useEffect } from "react";
import { cuzDisAppID, cuzDisHostURL, cuzDisWidgetDomID } from "../../constants";

export const Comment = (props) => {
  const { articleTitle, articleId } = props;
  useEffect(() => {
    if (!window.CUSDIS) {
      return;
    }
    window.CUSDIS.initial();
  }, [articleId]);
  return (
    <div
      id={cuzDisWidgetDomID}
      data-host={cuzDisHostURL}
      data-app-id={cuzDisAppID}
      data-page-id={`{{ ${articleId} }}`}
      data-page-title={`{{ ${articleTitle} }`}
    />
  );
};
