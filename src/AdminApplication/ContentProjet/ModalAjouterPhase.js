import React from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalAjouterPhase = ({ showModal, handleClose }) => {
  return (
    <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nouvelle phase</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="phaseSelect" className="form-label">Phase</label>
                <select id="phaseSelect" className="form-select">
                  <option value="phase1">Phase 1</option>
                  <option value="phase2">Phase 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Date début phase :</label>
                <DatePicker
                  id="startDate"
                  selected={null} // Provide the selected date
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Date fin phase :</label>
                <DatePicker
                  id="endDate"
                  selected={null} // Provide the selected date
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Annuler</button>
            <button type="button" className="btn btn-primary">Sauvegarder <i className="ti ti-device-floppy"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAjouterPhase;
