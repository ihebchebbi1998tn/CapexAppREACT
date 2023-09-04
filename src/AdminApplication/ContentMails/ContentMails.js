import React from "react";
import TableauDemandes from "./TableauDemandes";
import NavBarDemandes from "./NavBarDemandes";
import EnvoyerMessage from "./EnvoyerMessage";


const ContentDemandes = () => {
  return (
    <div class="container-fluid">
          <div className="row">

      <NavBarDemandes />
        <TableauDemandes />

        </div>
     </div>
  );
};

export default ContentDemandes;
