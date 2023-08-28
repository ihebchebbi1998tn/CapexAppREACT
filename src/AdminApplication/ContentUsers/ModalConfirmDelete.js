import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"; // Import the solid "check" icon

const ModalConfirmDelete = ({ showModal, onCancel, onConfirm }) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation de la suppression</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
                            <FontAwesomeIcon icon={faXmark} />{" "}

            </button>
            <button
              type="button"
              className="btn btn-danger" // You can adjust the color based on your styling
              onClick={onConfirm}
            >
              <FontAwesomeIcon icon={faCheck} />{" "}
           
 </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
