import React, { useState } from "react";
import TableauDemandes from "./TableauDemandes";
import NavBarDemandes from "./NavBarDemandes";
import EnvoyerMessage from "./EnvoyerMessage";
import TableauDemandesSent from "./TableauDemandesSent";

const ContentDemandes = () => {
  const [activeComponent, setActiveComponent] = useState("tableauDemandes");

  const handleShowTableauDemandes = () => {
    setActiveComponent("tableauDemandes");
  };

  const handleShowTableauDemandesSent = () => {
    setActiveComponent("tableauDemandesSent");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavBarDemandes
          onShowTableauDemandes={handleShowTableauDemandes}
          onShowTableauDemandesSent={handleShowTableauDemandesSent}
        />
        {activeComponent === "tableauDemandes" ? <TableauDemandes /> : null}
        {activeComponent === "tableauDemandesSent" ? (
          <TableauDemandesSent />
        ) : null}
      </div>
    </div>
  );
};

export default ContentDemandes;