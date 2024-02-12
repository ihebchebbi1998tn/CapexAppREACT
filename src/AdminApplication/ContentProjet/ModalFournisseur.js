import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalFournisseur = ({ showModal, handleClose, projectFournisseur, onSave }) => {
  const [selectedFournisseurId, setSelectedFournisseurId] = useState("");
  const [fournisseurs, setFournisseurs] = useState([]);
  const [evaluationFournisseur, setEvaluationFournisseur] = useState(1);
  const projetNom = projectFournisseur ? projectFournisseur.nom_projet : '';
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFournisseur();
  }, []);

  const fetchFournisseur = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/fournisseurs/get");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSliderChange = (e) => {
    setEvaluationFournisseur(parseInt(e.target.value));
  };

  const handleSave = () => {
    if (selectedFournisseurId) {
      // Update the Fournisseur evaluation
      axios
        .put(`http://127.0.0.1:8000/fournisseurs/update_evaluation/${selectedFournisseurId}`, {
          evaluation_fournisseur: evaluationFournisseur,
        })
        .then((response) => {
          setMessage({
            text: "Fournissuer Évalué ✔",
            level: "success",
          });

          // Call the onSave callback
          onSave();
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message.
        });
  
      // Update the Fournisseur name in the selected Project
      axios
        .put(`http://127.0.0.1:8000/projets/update-fournisseur/${projetNom}`, {
          selectedFournisseurId: selectedFournisseurId,
        })
        .then((response) => {
          // Handle the response, e.g., show a success message.
          console.log(response);
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message.
          console.log(error);
        });
        
      // Close the modal
      handleClose();
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-white">Evaluation fournisseur</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {message && (
              <div className={`alert alert-${message.level}`}>
                {message.text}
              </div>
            )}
            {/* First Form */}
            <form>
              <label>Fournisseur</label>
              <select
                className="form-control"
                id="roleUtilisateur"
                value={selectedFournisseurId}
                onChange={(e) => setSelectedFournisseurId(e.target.value)}
              >
                <option value="">Sélectionnez le fournisseur</option>
                {fournisseurs.map((fournisseur) => (
                  <option
                    key={fournisseur.id_fournisseur}
                    value={fournisseur.id_fournisseur}
                  >
                    {fournisseur.nom_fournisseur}
                  </option>
                ))}
              </select>
            </form>

            {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>
            {/* Second Form */}
            <label>Evaluation du fournisseur</label>
            <div className="mx-0 w-100">
              <label htmlFor="customRange3" className="form-label">
                Mauvais
              </label>
              <label
                htmlFor="customRange3"
                className="form-label float-end"
              >
                Excellent
              </label>
              <div className="range">
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                  step="1"
                  id="customRange3"
                  value={evaluationFournisseur}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Sauvegarder <i className="ti ti-device-floppy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFournisseur;
