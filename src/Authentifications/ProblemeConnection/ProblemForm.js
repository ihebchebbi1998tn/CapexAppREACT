import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
const ProblemForm = () => {
  const navigate = useNavigate(); 

  const handleCancelClick = () => {
    navigate("../"); 
  };

  return (
    <form>
      <div className="mb-2">
        <label htmlFor="nomPersonne" className="form-label">
          Nom
        </label>
        <input
          type="text"
          className="form-control"
          id="nomPersonne"
          aria-describedby="nameHelp"
          required
        />
        <label htmlFor="prenomPersonne" className="form-label">
          Prenom
        </label>
        <input
          type="text"
          className="form-control"
          id="prenomPersonne"
          aria-describedby="prenomHelp"
          required
        />
        <label htmlFor="CodePersonne" className="form-label">
          Code
        </label>
        <input
          type="text"
          className="form-control"
          id="CodePersonne"
          aria-describedby="codeHelp"
          required
        />
        <label htmlFor="prenomPersonne" className="form-label">
          Adresse e-mail
        </label>
        <input
          type="email"
          className="form-control"
          id="prenomPersonne"
          aria-describedby="prenomHelp"
        />
        <label htmlFor="CodePersonne" className="form-label">
          Quel est votre problème?
        </label>
        <textarea
          className="form-control"
          id="CodePersonne"
          aria-describedby="codeHelp"
          required
        />
      </div>

      <div className="d-flex justify-content-between mb-4">
        <button
        type="button"
          onClick={handleCancelClick}
          className="btn btn-warning w-25 py-8 fs-2 mb-4 rounded-2 mx-2"
        >
          <FontAwesomeIcon icon={faXmark} className="me-2" /> Annuler
        </button>

        <button className="btn btn-primary w-75 py-8 fs-4 mb-4 rounded-2 mx-2">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Envoyez la
          demande
        </button>
      </div>
    </form>
  );
};

export default ProblemForm;
