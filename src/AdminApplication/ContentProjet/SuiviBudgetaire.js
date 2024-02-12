import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalFournisseur from "./ModalFournisseur";
import ModalSuiviBudget from "./ModalSuiviBudget";
import ModalAjouterPhase from "./ModalAjouterPhase";
import ModalSuiviAvancement from "./ModalSuiviAvancement";
import { useUser } from "../../UserContext";
import SuiviAvancement from "./SuiviAvancement";
import EvaluationFournisseur from "./EvaluationFournisseur";
import PieceJointe from "./PieceJointe";

const SuiviBudgetaire = ({ project }) => {
  const [showModalFournisseur, setShowModalFournisseur] = useState(false);
  const [showModalSuivi, setShowModalSuivi] = useState(false);
  const [showModalAjouterPhase, setShowModalAjouterPhase] = useState(false);
  const [showModalSuiviAvancement, setShowModalSuiviAvancement] = useState(false);
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [message, setMessage] = useState(null);
  const { userData } = useUser();

  const userPassword = userData.pass;
  const userType = userData.type;
 
  const loadFactures = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/factures/listprojet?projet_facture=${project.nom_projet}`
      );
      setFactures(response.data);
    } catch (error) {
      console.error("Error loading factures:", error);
    }
  };

  useEffect(() => {
    loadFactures();

    const refreshInterval = setInterval(() => {
      loadFactures();
    }, 3000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const deleteFacture = (factureId) => {
    if (userType === 'Admin') {
      const confirmDelete = window.confirm('Veuillez entrer votre mot de passe pour supprimer cette facture.');
      if (confirmDelete) {
        const enteredPassword = prompt('Tapez votre mot de passe:');
        if (enteredPassword === userPassword) {
          axios
            .delete(`http://127.0.0.1:8000/factures/delete/${factureId}`)
            .then((response) => {
              console.log("Facture deleted:", response.data);
              setMessage({
                text: "Facture supprimée ✔",
                level: "success",
              });
              loadFactures();
            })
            .catch((error) => {
              console.error("Error deleting facture:", error);
            });
        } else {
          alert('Le mot de passe ne correspond pas. La facrure n a pas été supprimé. ✘');
        }
      }
    } else {
      alert('Vous n avez pas les autorisations nécessaires pour supprimer des projets.');
    }
  };

  return (
    <div className="row">
      <h5 className="card-title fw-semibold mb-4">
        Projet : {project?.nom_projet || "-"}
      </h5>
      <div className="col-md-4 d-flex">
        <div className="card flex-grow-1">
          <div className="card-header">
            <strong>Suivie  budgetaire</strong>
          </div>
          <div className="card-body">
            <div className="grouped-sections">
              <p className="card-text">
                <h5 className="card-title">
                  Engagé : {project?.budget_projet} <strong>TND</strong>
                </h5>
              </p>
              {message && (
                <div className={`alert alert-${message.level}`}>
                  {message.text}
                </div>
              )}
              <div className="facture-section">
                {factures.length > 0 ? (
                  factures.map((facture) => (
                    <div key={facture.id} className="facture-item">
                      <p className="card-text">
                        <h5 className="card-title">
                          Facturé: {facture.total_facture} <strong>TND</strong>
                        </h5>
                      </p>
                      <p className="card-text">
                        <p className="card-title">
                          Transfert vers: {facture.vers_facture}
                        </p>
                      </p>
                      <p className="card-text">
                        <p className="card-title">
                          Transfert depuis: {facture.depuis_facture}{" "}
                        </p>
                      </p>
                      <p className="card-text">
                        <h5 className="card-title">
                          Rallonge: {facture.rallonge_facture}{" "}
                        </h5>
                      </p>
                      {userType === "Admin" && (
                        <div className="d-flex justify-content-end mt-3">
                          <button
                            className="btn btn-outline-primary m-1"
                            onClick={() => deleteFacture(facture.id)}
                          >
                            <i className="ti ti-eraser"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="facture-item">
                    <p className="card-text">
                      <h5 className="card-title">Facturé: -</h5>
                    </p>
                    <p className="card-text">
                      <h5 className="card-title">Transfert vers: -</h5>
                    </p>
                    <p className="card-text">
                      <h5 className="card-title">Transfert depuis: -</h5>
                    </p>
                    <p className="card-text">
                      <h5 className="card-title">Rallonge: -</h5>
                    </p>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="btn btn-outline-primary m-1"
                        onClick={() => setShowModalSuivi(true)}
                      >
                        <i className="ti ti-pencil"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuiviAvancement projectNom={project} />
      <div className="col-md-4 d-flex flex-column">
        <EvaluationFournisseur projectFournisseur={project} />
        <PieceJointe  projectFichier={project} />
      </div>
      <ModalFournisseur
        showModal={showModalFournisseur}
        handleClose={() => setShowModalFournisseur(false)}
      />
      <ModalSuiviBudget
        showModal={showModalSuivi}
        handleClose={() => setShowModalSuivi(false)}
        projectBudget={project}
        selectedFacture={selectedFacture}
        setSelectedFacture={setSelectedFacture}
      />
    </div>
  );
};

export default SuiviBudgetaire;
