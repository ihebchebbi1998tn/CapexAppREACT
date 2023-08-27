import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalUserEdit = ({ isOpen, onClose, selectedUser }) => {
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setEditedUser(selectedUser);
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Here, you can make an API request to update the user information
    // based on the editedUser data.
    // After successful update, close the modal.
    onClose();
  };

  const formElementWidth = 425; // You can adjust this value as needed


  return (
<div className={`modal fade ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content" style={{ width: `${formElementWidth}px` }}>
      <div className="modal-header">
        <h5 className="modal-title">Edit User</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form>
        <div className="d-flex">
  <div className="mb-4 me-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input
      type="text"
      id="name"
      name="nom_utilisateur"
      value={editedUser.nom_utilisateur || ""}
      readOnly // Set input as read-only
      onChange={handleInputChange}
      className="form-control"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="form-label">Email</label>
    <input
      type="email"
      id="email"
      name="email_utilisateur"
      value={editedUser.email_utilisateur || ""}
      readOnly // Set input as read-only
      onChange={handleInputChange}
      className="form-control"
    />
  </div>
</div>

<div className="d-flex">
  <div className="mb-4 me-3">
    <label htmlFor="email" className="form-label">Mot de Passe</label>
    <input
      type="password"
      id="email"
      name="mot_de_passe"
      value={editedUser.mot_de_passe || ""}
      onChange={handleInputChange}
      className="form-control"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="code" className="form-label">Code</label>
    <input
      type="text" // Use "text" type instead of "email"
      id="code"
      name="code_utilisateur"
      value={editedUser.code_utilisateur || ""}
      onChange={handleInputChange}
      className="form-control"
    />
  </div>
</div>

<div className="d-flex">
  <div className="mb-4 me-3">
    <label htmlFor="groupe" className="form-label">Groupe</label>
    <select
      id="groupe"
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
    <label htmlFor="departement" className="form-label">Département</label>
    <select
      id="departement"
      name="role_utilisateur"
      value={editedUser.role_utilisateur || ""}
      onChange={handleInputChange}
      className="form-select"
    >
      <option value="Ressources humaines (RH)">Ressources humaines (RH)</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
      <option value="Ventes">Ventes</option>
      <option value="Recherche et développement (R&D)">Recherche et développement (R&D)</option>
      <option value="Production">Production</option>
      <option value="Approvisionnement">Approvisionnement</option>
      <option value="Service client">Service client</option>
      <option value="Informatique">Informatique</option>
      <option value="Juridique">Juridique</option>
      <option value="Logistique">Logistique</option>
    </select>
  </div>
</div>

          {/* Add other input fields for user properties */}
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  </div>
</div>
       

  );
};

export default ModalUserEdit;
