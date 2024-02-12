import React from "react";
import AddComment from "./AddComment";
import DisplayComments from "./DisplayComments";
import "./comments.css";

const Comments = ({ project }) => {
  return (
    <div className="container-fluid">
<AddComment projectName={project} />
{/* Espacement entre les éléments */}
<div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>
<DisplayComments projectName={project} />

    </div>
  );
};

export default Comments;
