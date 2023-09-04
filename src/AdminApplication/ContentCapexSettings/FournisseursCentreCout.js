import React, { useState } from "react";
import GestionCentreCout from "./GestionCentreCout";
import GestionFournisseurs from "./GestionFournisseurs";


const FournisseursCentreCout = () => {
 

  return (
    <div className="row">
      

     <GestionFournisseurs />
<GestionCentreCout />
    </div>
  );
};

export default FournisseursCentreCout;
