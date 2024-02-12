import React from "react";
import SuiviBudgetaire from "./SuiviBudgetaire";
import Comments from "./Comments";
const SelectedProjet = ({ selectedProject }) => {
  return (
    <div className="container-fluid">
<SuiviBudgetaire project={selectedProject} />
<Comments project={selectedProject}/>
    </div>
  );
};

export default SelectedProjet;
