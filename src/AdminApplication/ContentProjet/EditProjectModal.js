// EditProjectModal.js
import React, { useState } from 'react';
import axios from 'axios';

const EditProjectModal = ({ project, onClose, onProjectUpdated }) => {
  const [editedProject, setEditedProject] = useState({
    nom_projet: project.nom_projet,
    debut_projet: project.debut_projet,
    fin_projet: project.fin_projet,
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleUpdateProject = () => {
    axios
      .put(`http://127.0.0.1:8000/projets/update/${project.id}`, editedProject)
      .then((response) => {
        console.log('Project updated:', response.data);
        onProjectUpdated();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Project</h2>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="nom_projet"
            value={editedProject.nom_projet}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="debut_projet"
            value={editedProject.debut_projet}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="fin_projet"
            value={editedProject.fin_projet}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields as needed */}
        <button onClick={handleUpdateProject}>Update Project</button>
      </div>
    </div>
  );
};

export default EditProjectModal;
