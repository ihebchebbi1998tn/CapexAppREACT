import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GestionGroupes from "./GestionGroupes";
import GestionDepartements from "./GestionDepartements";
import ExigenceReglementaire from "./ExigenceReglementaire";


const GroupesDepartements = () => {
 

  return (
    <div className="row">
      

     <GestionDepartements />
     <GestionGroupes />
<ExigenceReglementaire />
    </div>
  );
};

export default GroupesDepartements;
