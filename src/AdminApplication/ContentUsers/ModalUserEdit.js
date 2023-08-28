import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"; // Import the solid "check" icon

const ModalUserEdit = ({ isOpen, onClose, selectedUser }) => {
  const [editedUser, setEditedUser] = useState({});
  const [userStatus, setUserStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser({
        ...selectedUser,
        id_utilisateur: selectedUser.id_utilisateur,
      });
      setUserStatus(selectedUser.statut_utilisateur);
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const confirmEdit = window.confirm("Êtes-vous sûr de vouloir modifier cet utilisateur ?");
    if (confirmEdit) {
      try {
        editedUser.statut_utilisateur = userStatus;
        const response = await axios.put(
          `http://127.0.0.1:8000/user/update/${editedUser.id_utilisateur}`,
          editedUser
        );

        if (response.data.message && response.data.message.level === "success") {
          setSuccess("Utilisateur modifié avec succès.");
          setError(null);
        } else {
          setError("Impossible de modifier l'utilisateur.");
          setSuccess(null);
        }
      } catch (error) {
        setError("Une erreur est survenue.");
        setSuccess(null);
      }
    } else {
      // Cancel the edit
    }
  };


  const formElementWidth = 425;

  

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{ width: `${formElementWidth}px` }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Modifier l'utilisateur : <strong>{editedUser.nom_utilisateur}</strong></h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
         
          <div className="modal-body">
          {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <form>
              {/* Input fields */}
              <div className="mb-4">
                <label htmlFor="mot_de_passe" className="form-label">
                  Mot de Passe
                </label>
                <input
                  type="password"
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={editedUser.mot_de_passe || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="code_utilisateur" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  id="code_utilisateur"
                  name="code_utilisateur"
                  value={editedUser.code_utilisateur || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="groupe_utilisateur" className="form-label">
                  Groupe
                </label>
                <select
                  id="groupe_utilisateur"
                  name="groupe_utilisateur"
                  value={editedUser.groupe_utilisateur || ""}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="CLC">CLC</option>
                  <option value="CLN">CLN</option>
                  <option value="CLSB">CLSB</option>
                  <option value="SBC">SBC</option>
                  <option value="CF">CF</option>
                  <option value="Delta Plastic">Delta Plastic</option>
                  <option value="STIAL">STIAL</option>
                  <option value="SOCOGES">SOCOGES</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="role_utilisateur" className="form-label">
                  Département
                </label>
                <select
                  id="role_utilisateur"
                  name="role_utilisateur"
                  value={editedUser.role_utilisateur || ""}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Ressources humaines (RH)">
                    Ressources humaines (RH)
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Ventes">Ventes</option>
                  <option value="Recherche et développement (R&D)">
                    Recherche et développement (R&D)
                  </option>
                  <option value="Production">Production</option>
                  <option value="Approvisionnement">Approvisionnement</option>
                  <option value="Service client">Service client</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Juridique">Juridique</option>
                  <option value="Logistique">Logistique</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="statut_utilisateur" className="form-label">Statut Utilisateur</label>
                <select
                  id="statut_utilisateur"
                  name="statut_utilisateur"
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="Activé">Activé</option>
                  <option value="Désactivé">Désactivé</option>
                </select>
              </div>
              
              {/* ... Add other input fields for user properties ... */}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} />{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              <FontAwesomeIcon icon={faCheck} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserEdit;
