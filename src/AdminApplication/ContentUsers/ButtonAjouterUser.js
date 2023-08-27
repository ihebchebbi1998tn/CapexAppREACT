import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonAjouterUser = () => {
  return (
    <div className="d-flex justify-content-end mt-3">
      <a href="/" className="text-decoration-none">
        <div className="card" style={{ width: "300px", height: "50px" }}>
          <div className="card-body d-flex align-items-center p-2"> {/* Adjusted padding */}
            <FontAwesomeIcon icon={faPlus} className="me-3" size="2x" style={{ color: "#5d87ff" }} />
            <h5 className="card-title mb-0">Ajouter un nouvel utilisateur</h5>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ButtonAjouterUser;
