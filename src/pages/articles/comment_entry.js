import React, { useContext } from "react";
import { PanelContext } from "../../components/panel/panel_context";
import { Comment } from "./comment";
import Style from "./index.scss";

export const CommentEntry = (props) => {
  const { title, id } = props;
  const { setPanelVisible, setPanelContent } = useContext(PanelContext);
  return (
    <div
      className={Style.commentEntry}
      onClick={(e) => {
        e.stopPropagation();
        setPanelContent(<Comment articleId={id} articleTitle={title} />);
        setPanelVisible(true);
      }}
    >
      “…”
    </div>
  );
};
