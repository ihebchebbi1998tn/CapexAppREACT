import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const ModalAjouterPhase = ({ showModal, handleClose, handleAddPhase,Projetnom }) => {
  const [selectedPhase, setSelectedPhase] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState(null);
  // Set a default value for projet_phase
  const defaultProjetPhase = Projetnom.nom_projet;

  const handleSave = () => {
    // Validation
    const errors = {};

    if (!selectedPhase || !startDate || !endDate) {
      setMessage({
        text: "Tous les champs sont requis ✘",
        level: "warning",
      });
    }

    if (startDate && endDate && startDate > endDate) {
      setMessage({
        text: "TLa date de début doit être antérieure à la date de fin ✘",
        level: "warning",
      });
    }

    if (Object.keys(errors).length === 0) {
      // Send a POST request to add the phase
      axios
        .post("http://127.0.0.1:8000/phases/create", {
          nom_phase: selectedPhase,
          debut_phase: startDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
          fin_phase: endDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
          projet_phase: defaultProjetPhase, // Set default value
        })
        .then((response) => {
          if (response.status === 200) {
            // Phase creation was successful
            handleAddPhase(response.data.phase);
            setMessage({
              text: "Phase ajoutée avec succès ✔",
              level: "success",
            });
          } else {
          
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          // You may want to show an error message or handle errors appropriately.
        });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-white">Nouvelle phase</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="phaseSelect" className="form-label">Phase</label>
                <select
                  id="phaseSelect"
                  className={`form-select ${validationErrors.phase ? 'is-invalid' : ''}`}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  value={selectedPhase}
                >
                  <option value="">Sélectionnez une phase</option>
                  <option value="Definition des objectifs">Définition des objectifs</option>
                  <option value="Conception du projet">Conception du projet</option>
                  <option value="Execution">Exécution</option>
                  <option value="Clôture du projet">Clôture du projet</option>
                </select>
                {validationErrors.phase && (
                  <div className="invalid-feedback">{validationErrors.phase}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Date début phase :</label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd" // Format date as "2023-11-01"
                  className={`form-control ${validationErrors.startDate ? 'is-invalid' : ''}`}
                  minDate={new Date()}
                />
                {validationErrors.startDate && (
                  <div className="invalid-feedback">{validationErrors.startDate}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Date fin phase :</label>
                <DatePicker
                  id="endDate"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd" // Format date as "2023-11-01"
                  className={`form-control ${validationErrors.endDate ? 'is-invalid' : ''}`}
                  minDate={new Date()}
                />
                {validationErrors.endDate && (
                  <div className="invalid-feedback">{validationErrors.endDate}</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Sauvegarder <i className="ti ti-device-floppy"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAjouterPhase;
