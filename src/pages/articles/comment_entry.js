import React from "react";
import { Comment } from "./comment";
import Style from "./index.scss";
import { usePanel } from "../../components/panel";

export const CommentEntry = (props) => {
  const { title, id } = props;
  const { showPanel } = usePanel();
  return (
    <div
      className={Style.commentEntry}
      onClick={(e) => {
        e.stopPropagation();
        showPanel(<Comment articleId={id} articleTitle={title} />);
      }}
    >
      “…”
    </div>
  );
};
