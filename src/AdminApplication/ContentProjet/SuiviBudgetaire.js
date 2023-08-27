import React, { useState } from "react";
import ModalFournisseur from "./ModalFournisseur";
import ModalSuiviBudget from "./ModalSuiviBudget";
import ModalAjouterPhase from "./ModalAjouterPhase";
import ModalSuiviAvancement from "./ModalSuiviAvancement";
const SuiviBudgetaire = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModalFournisseur, setShowModalFournisseur] = useState(false);
  const [ShowModalSuivi, setShowModalSuivi] = useState(false);
  const [ShowModalAjouterPhase, setShowModalAjouterPhase] = useState(false);
  const [ShowModalSuiviAvancement, setShowModalSuiviAvancement] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className="row">
      <h5 className="card-title fw-semibold mb-4">Projet : - </h5>

      <div className="col-md-4 d-flex">
  <div className="card flex-grow-1">
    <div className="card-header">
      <strong>Suivi budgetaire</strong>
    </div>
    <div className="card-body">
      <div className="grouped-sections">
        <p className="card-text">
          <h5 className="card-title">Engagé : -</h5>
        </p>
        <div className="facture-section">
          <p className="card-text">
            <h5 className="card-title">Facturé : -</h5>
          </p>
          <div className="offset-sections">
            <p className="card-text">
              <h5 className="card-title">Transfert vers : -</h5>
            </p>
            <p className="card-text">
              <h5 className="card-title">Transfert depuis : -</h5>
            </p>
            <p className="card-text">
              <h5 className="card-title">Rallonge : -</h5>
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-outline-primary m-1"
          onClick={() => setShowModalSuivi(true)}
        >
          <i className="ti ti-pencil"></i>
        </button>
      </div>
    </div>
  </div>
</div>




      {/* Additional similar cards */}
      <div className="col-md-4 d-flex">
        <div className="card flex-grow-1">
          <div className="card-header">
            <strong>Suivi d'avancement</strong>
          </div>
          <div className="card-body">
            <p className="card-text">
              <h5 className="card-title">Date début réel : -</h5>
            </p>
            <p className="card-text">
              <h5 className="card-title">Date de clôture réel : -</h5>
            </p>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-outline-primary m-1"
                onClick={() => setShowModalSuiviAvancement(true)}
              >
                <i className="ti ti-pencil"></i>
              </button>
            </div>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {/* Card 1 */}
              <div className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">Phase : nom phase 1</h5>
                  <p className="card-text">Date début : - décember 2023 </p>
                  <p className="card-text">Date fin : - décember 2023 </p>
                  <a href="#" className="card-link">
                    <i className="ti ti-trash"></i>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">Phase : nom phase 1</h5>
                  <p className="card-text">Date début : - décember 2023 </p>
                  <p className="card-text">Date fin : - décember 2023 </p>
                  <a href="#" className="card-link">
                    <i className="ti ti-trash"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-outline-primary m-1"
                onClick={() => setShowModalAjouterPhase(true)}
              >
                <i class="ti ti-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional similar cards */}
      <div className="col-md-4 d-flex flex-column">
        
        <div className="card flex-grow-1 mb-3">
          <div className="card-header">
            <strong>Evaluation fournisseur</strong>
          </div>
          <div className="card-body">
            <p className="card-text">
              <h5 className="card-title">Fournisseur : -</h5>
            </p>
            <p className="card-text">
              <h5 className="card-title">Evaluation du fournisseur : -</h5>
            </p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-primary m-1"
                onClick={() => setShowModalFournisseur(true)}
              >
                <i className="ti ti-pencil"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="card flex-grow-1">
          <div className="card-header">
            <strong>Pièces Jointes</strong>
          </div>
          <div className="card-body">
            <input
              type="file"
              className="form-control form-control-lg"
              id="chooseFile"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileChange}
            />
            {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>
            <a href="#" class="btn btn-success m-1">
              <i class="ti ti-files"></i> Détails
            </a>
            <div className="d-flex justify-content-end">
              <a href="#" className="btn btn-outline-primary m-1">
                Enregister<i class="ti ti-file-upload"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ModalFournisseur
        showModal={showModalFournisseur}
        handleClose={() => setShowModalFournisseur(false)}
      />
      <ModalSuiviBudget
        showModal={ShowModalSuivi}
        handleClose={() => setShowModalSuivi(false)}
      />
      <ModalAjouterPhase 
       showModal={ShowModalAjouterPhase}
       handleClose={() => setShowModalAjouterPhase(false)}
     />
     <ModalSuiviAvancement 
     showModal={ShowModalSuiviAvancement}
      handleClose={() => setShowModalSuiviAvancement(false)}
     />
    </div>
  );
};

export default SuiviBudgetaire;
