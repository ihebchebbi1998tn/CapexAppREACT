import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ModalCentreCoutDetails = ({ isOpen, onClose, selectedCentreCout, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCentreCout, setEditedCentreCout] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCentreCout((prevCentreCout) => ({
      ...prevCentreCout,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCentreCout(selectedCentreCout || {});
  };

  // Inside handleSaveChanges function
const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/centres-cout/update/${selectedCentreCout?.id_centrecout}`,
        editedCentreCout
      );
  
      if (response.data.message && response.data.message.level === "success") {
        setIsEditing(false);
        onUpdate(selectedCentreCout?.id_centrecout, editedCentreCout);
      }
    } catch (error) {
      console.error("Error updating centre de coût:", error);
    }
  };
  

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Détails du centre de coût :{" "}
              <strong>{selectedCentreCout?.code_centrecout}</strong>
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="groupe_centrecout" className="form-label">
                  Groupe
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="groupe_centrecout"
                    name="groupe_centrecout"
                    value={editedCentreCout.groupe_centrecout || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p>{selectedCentreCout?.groupe_centrecout}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="departement_centrecout" className="form-label">
                  Département
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="departement_centrecout"
                    name="departement_centrecout"
                    value={editedCentreCout.departement_centrecout || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p>{selectedCentreCout?.departement_centrecout}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="total_centrecout" className="form-label">
                  Total
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="total_centrecout"
                    name="total_centrecout"
                    value={editedCentreCout.total_centrecout || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p>{selectedCentreCout?.total_centrecout} TND</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="depense_centrecout" className="form-label">
                  Dépense
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="depense_centrecout"
                    name="depense_centrecout"
                    value={editedCentreCout.depense_centrecout || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p>{selectedCentreCout?.depense_centrecout} TND</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="reste_centrecout" className="form-label">
                  Reste
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="reste_centrecout"
                    name="reste_centrecout"
                    value={editedCentreCout.reste_centrecout || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p>{selectedCentreCout?.reste_centrecout} TND</p>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  <FontAwesomeIcon icon={faTimes} /> 
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  <FontAwesomeIcon icon={faCheck} /> 
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> 
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCentreCoutDetails;
