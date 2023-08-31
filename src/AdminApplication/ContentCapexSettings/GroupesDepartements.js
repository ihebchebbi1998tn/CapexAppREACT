import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GestionGroupes from "./GestionGroupes";
import GestionDepartements from "./GestionDepartements";
import GestionCentreCout from "./GestionCentreCout";


const GroupesDepartements = () => {
 

  return (
    <div className="row">
      

     <GestionDepartements />
     <GestionGroupes />
<GestionCentreCout />
    </div>
  );
};

export default GroupesDepartements;
