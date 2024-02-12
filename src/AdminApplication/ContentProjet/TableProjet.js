import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';

const TableProjet = ({ projects, onSeeDetailsClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(5);
  const { userData } = useUser();
  const userPassword = userData.pass;
  const userType = userData.type;
  const [message, setMessage] = useState(null);
  const [editedProject, setEditedProject] = useState(null); // New state for edited project
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/projets/list');
      // Assuming that you receive the data from the server and update the parent component's state
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSeeDetailsClick = (project) => {
    onSeeDetailsClick(project);
  };

  const handleRowsPerPageChange = (e) => {
    setCurrentPage(1);
    setProjectsPerPage(e.target.value);
  };

  useEffect(() => {
    fetchProjects();

    const pollingInterval = 3000; // 3 seconds

    const intervalId = setInterval(() => {
      fetchProjects();
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteProject = (projectId) => {
    // Check if the user type is 'Admin' to allow project deletion
    if (userType === 'Admin') {
      const confirmDelete = window.confirm('Veuillez entrer votre mot de passe pour supprimer ce projet.');
      if (confirmDelete) {
        const enteredPassword = prompt('Tapez votre mot de passe:');
        if (enteredPassword === userPassword) {
          axios
            .delete(`http://127.0.0.1:8000/projets/delete/${projectId}`)
            .then((response) => {
              console.log('Project deleted:', response.data);
              fetchProjects(); // Assuming you update the project list after deletion
              setMessage({
                text: 'Projet supprimé avec succès ✔',
                level: 'success',
              });
            })
            .catch((error) => {
              console.error('Error deleting project:', error);
            });
        } else {
          alert('Le mot de passe ne correspond pas. Le projet n a pas été supprimé. ✘');
        }
      }
    } else {
      alert('You do not have the permissions to delete projects.');
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handleEditProjectClick = (project) => {
    setEditedProject(project);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = () => {
    if (userType === 'Admin') {
      const confirmDelete = window.confirm('Veuillez entrer votre mot de passe pour supprimer ce projet.');
      if (confirmDelete) {
        const enteredPassword = prompt('Tapez votre mot de passe:');
        if (enteredPassword === userPassword) {
    axios
      .put(`http://127.0.0.1:8000/projets/update/${editedProject.id}`, editedProject)
      .then((response) => {
        console.log('Project updated:', response.data);
        fetchProjects(); // Assuming you update the project list after update
        setMessage({
          text: 'Projet mis à jour avec succès ✔',
          level: 'success',
        });
        setEditedProject(null); // Reset the edited project after update
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });} else {
        alert('Le mot de passe ne correspond pas. Le projet n a pas été supprimé. ✘');
      }
    }
  } else {
    alert('You do not have the permissions to delete projects.');
  }
  };

  const renderProjects = currentProjects
  .filter((project) => project.nom_projet.toLowerCase().includes(searchTerm.toLowerCase()))
  .map((project) => (
    <tr key={project.id}>
      <td>{project.nom_projet}</td>
      <td><strong>{project.Priorite_projet}</strong></td>
      <td>{project.categorie_projet}</td>
      <td>{project.budget_projet} <strong>TND</strong></td>
      <td>{project.debut_projet}</td>
      <td>{project.fin_projet}</td>
      <td>
        {userType === 'Admin' ? (
          <>
            <img
              src="/icons/edit.png"
              alt="Edit"
              className="cursor-pointer me-2"
              style={{ width: '20px', height: '20px' }}
              onClick={() => handleEditProjectClick(project)}
            />
            <img
              src="/icons/delete.png"
              alt="Delete"
              className="cursor-pointer me-2"
              style={{ width: '20px', height: '20px' }}
              onClick={() => handleDeleteProject(project.id)}
            />
          </>
        ) : null}
        <img
          src="/icons/SeeDetails.png"
          alt="Details"
          className="cursor-pointer"
          style={{ width: '30px', height: '30px' }}
          onClick={() => handleSeeDetailsClick(project)}
        />
      </td>
    </tr>
  ));


  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="col-lg-12 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="card-title fw-semibold">Listes des projets</h5>
          </div>
          {message && (
            <div className={`alert alert-${message.level}`}>{message.text}</div>
          )}
          <form className="d-flex">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small search-input"
                id="searchInput"
                aria-describedby="emailHelp"
                placeholder="Rechercher..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-light border-0 search-icon">
                  <i className="ti ti-search"></i>
                </span>
              </div>
            </div>
          </form>

          <div className="table-responsive">
          <table className="table text-nowrap mb-0 align-middle">
  <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Projet</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Priorité</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Catégorie du projet</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Total Budget</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Date début prévu</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Date fin prévu</h6>
                  </th>
                  {userType === 'Admin' && (
                    <th className="border-bottom-0">
                      <h6 className="fw-semibold mb-0">Actions</h6>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {editedProject ? (
                  <tr key={editedProject.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.nom_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, nom_projet: e.target.value })}
                        style={{ width: '300px' }} // Adjust the width as needed

                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.Priorite_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, Priorite_projet: e.target.value })}
                        style={{ width: '150px' }} // Adjust the width as needed

                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.categorie_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, categorie_projet: e.target.value })}
                        style={{ width: '250px' }} // Adjust the width as needed
                     />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.budget_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, budget_projet: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.debut_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, debut_projet: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedProject.fin_projet}
                        onChange={(e) => setEditedProject({ ...editedProject, fin_projet: e.target.value })}
                      />
                    </td>
                    <td>
                      <button className="btn btn-success me-2" onClick={handleUpdateProject}>Update</button>
                      <button className="btn btn-secondary" onClick={() => setEditedProject(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  renderProjects
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="projectsPerPage">Projets par page</label>
              <select
                className="form-select"
                id="projectsPerPage"
                onChange={handleRowsPerPageChange}
                value={projectsPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <nav className="ms-3">
              <ul className="pagination mb-0">
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProjet;
