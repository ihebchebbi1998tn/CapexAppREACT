import React from "react";


const ModalSuiviAvancement = ({ showModal, handleClose }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Suivi d'avancement</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="phaseSelect" className="form-label">
                Date début réel 
                </label>
                <input type="text" className="form-control" />

              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                Date de clôture réel 
                </label>
                <input type="text" className="form-control" />

              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Annuler
            </button>
            <button type="button" className="btn btn-primary">
              Sauvegarder <i className="ti ti-device-floppy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuiviAvancement;
