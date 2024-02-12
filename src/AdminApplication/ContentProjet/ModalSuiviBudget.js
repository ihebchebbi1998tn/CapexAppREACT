import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

const ModalSuiviBudget = ({ showModal, handleClose, projectBudget }) => {
  const projectname = projectBudget.nom_projet;

  const [factureData, setFactureData] = useState({
    total_facture: "",
    vers_facture: "",
    depuis_facture: "",
    rallonge_facture: "0", // Default value
  });

  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFactureData({ ...factureData, [id]: value });
  };

  const createFacture = async (rallonge) => {
    const currentDate = new Date();
    const formattedDate =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      currentDate.getDate().toString().padStart(2, "0");

    try {
      const response = await axios.post("http://127.0.0.1:8000/factures/create", {
        projet_facture: projectname,
        total_facture: factureData.total_facture,
        vers_facture: factureData.vers_facture,
        depuis_facture: factureData.depuis_facture,
        rallonge_facture: rallonge,
        date_facture: formattedDate,
      });

      console.log("Facture created:", response.data);
    } catch (error) {
      console.error("Error creating facture:", error);
    }
  };

  const handleSave = () => {
    if (
      !factureData.total_facture ||
      !factureData.vers_facture ||
      !factureData.depuis_facture
    ) {
      setAlertMessage("Veuillez remplir tous les champs obligatoires ✘");
      return;
    } else {
      setAlertMessage(null);
    }

    const totalFacture = parseInt(factureData.total_facture);
    const budgetProjet = projectBudget?.budget_projet;

    if (totalFacture > budgetProjet) {
      const diff = totalFacture - budgetProjet;
      const confirmRallonge = window.confirm(
        `La facture totale dépasse le budget du projet. Voulez-vous ajouter ${diff} TND vers une Rallonge ?`
      );

      if (confirmRallonge) {
        createFacture(`${diff}`);
      } else {
        return;
      }
    } else {
      createFacture("-"); // Facture creation with rallonge set to "-"
    }

    handleClose();
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Suivi budgetaire</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {alertMessage && (
              <div className="alert alert-danger">{alertMessage}</div>
            )}
            {/* First Form */}
            <form>
              <label>Engagé</label>
              <input
                type="text"
                className="form-control"
                value={projectBudget?.budget_projet + " TND"}
              />
              <label>Facturé</label>
              <input
                type="text"
                className="form-control"
                id="total_facture"
                value={factureData.total_facture}
                onChange={handleInputChange}
              />
              <label>Transfert vers</label>
              <input
                type="text"
                className="form-control"
                id="vers_facture"
                value={factureData.vers_facture}
                onChange={handleInputChange}
              />
              <label>Transfert depuis</label>
              <input
                type="text"
                className="form-control"
                id="depuis_facture"
                value={factureData.depuis_facture}
                onChange={handleInputChange}
              />
              <label>Rallonge</label>
              <input
                type="text"
                className="form-control"
                id="rallonge_facture"
                value={factureData.rallonge_facture}
                disabled
              />
            </form>
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

export default ModalSuiviBudget;
