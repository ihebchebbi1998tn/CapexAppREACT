import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AjouterProjet = () => {
  return (
    <>
    <a href="/"> 
    <div className="row">
      <div className="col-lg-6 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body d-flex">
          <FontAwesomeIcon icon={faPlus} className="me-3" size="3x" style={{ color: "#5d87ff" }} />
            <div>
              <h5 className="card-title">Nouveau projet</h5>
              <p className="card-text">Ajouter un projet a Capex.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </a>
    </>
  );
};

export default AjouterProjet;
