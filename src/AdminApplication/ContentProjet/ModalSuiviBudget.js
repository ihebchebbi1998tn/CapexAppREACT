import React from "react";

const ModalSuiviBudget = ({ showModal, handleClose }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Suivi budgetaire</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {/* First Form */}
            <form>
              <label>Engagé</label>
              <input type="text" className="form-control" />
              <label>Facturé</label>
              <input type="text" className="form-control" />
              <label>Transfert vers</label>
              <input type="text" className="form-control" />
              <label>Transfert depuis</label>
              <input type="text" className="form-control" />
              <label>Facturé </label>
              <input type="text" className="form-control" />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Sauvegarder <i className="ti ti-device-floppy"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuiviBudget;
