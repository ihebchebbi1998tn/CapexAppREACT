import React from "react";
import "./messagecss.css";

const MessageModal = ({ showModal, handleClose, selectedMessage }) => {
  if (!showModal || !selectedMessage) {
    return null;
  }

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-white">Détails du message</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="message-details">
              <div className="message-info">
                <div className="info-category">
                  <div className="category-row">
                    <strong>Expediteur:</strong> {selectedMessage.expediteur_message}
                  </div>
                  <div className="category-row">
                    <strong>Date:</strong> {selectedMessage.date_message}
                  </div>
                </div>
                <div className="message-content">
                  <strong>Raison:</strong> {selectedMessage.raison_message}
                </div>
                <div className="message-content">
                  <strong>Objet:</strong> {selectedMessage.objet_message}
                </div>
                <div className="message-content">
                  <strong>Sujet:</strong> {selectedMessage.sujet_message}
                </div>
               
              </div>
              <div className="message-content">
                <strong>Message:</strong>
                <p>{selectedMessage.message_message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
