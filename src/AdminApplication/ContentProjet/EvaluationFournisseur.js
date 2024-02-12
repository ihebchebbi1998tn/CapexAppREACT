import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalFournisseur from "./ModalFournisseur";
import { useUser } from "../../UserContext";

const EvaluationFournisseur = ({ projectFournisseur }) => {
  const [showModalFournisseur, setShowModalFournisseur] = useState(false);
  const [fournisseurData, setFournisseurData] = useState({
    nom_fournisseur: "",
    evaluation_fournisseur: "",
  });
  const idFournisseurProjet = projectFournisseur.fournisseur_projet;
  const { userData } = useUser();
  const [refreshFlag, setRefreshFlag] = useState(true);

  // Function to fetch Fournisseur data
  const fetchFournisseurData = () => {
    if (idFournisseurProjet) {
      axios
        .get(`http://127.0.0.1:8000/fournisseurs/get/${idFournisseurProjet}`)
        .then((response) => {
          setFournisseurData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching fournisseur data:", error);
        });
    }
  };

  const refreshComponent = () => {
    // Trigger a refresh (e.g., fetch updated data)
    fetchFournisseurData();
  };

  

  useEffect(() => {
    // Fetch Fournisseur data initially
    fetchFournisseurData();

    // Fetch Fournisseur data every 3 seconds
    const intervalId = setInterval(() => {
      fetchFournisseurData();
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [/* your dependencies here */]);

  return (
    <div className="card flex-grow-1 mb-3">
      <div className="card-header">
        <strong>Évaluation fournisseur</strong>
        <h3/>
      </div>
      <div className="card-body">
        <p className="card-text">
          <p className="card-title">Fournisseur: <strong>{fournisseurData.nom_fournisseur || "-"}</strong></p>
        </p>
        <p className="card-text">
          <p className="card-title">Evaluation du fournisseur: <strong>{fournisseurData.evaluation_fournisseur}</strong></p>
        </p>
        {(userData.type === 'Admin' || fournisseurData.nom_fournisseur === "") && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-primary m-1"
              onClick={() => setShowModalFournisseur(true)}
            >
              <i className="ti ti-pencil"></i>
            </button>
          </div>
        )}
      </div>
      <ModalFournisseur
        showModal={showModalFournisseur}
        handleClose={() => setShowModalFournisseur(false)}
        projectFournisseur={projectFournisseur}
        fournisseurData={fournisseurData}
        onSave={refreshComponent}
      />
    </div>
  );
};

export default EvaluationFournisseur;
