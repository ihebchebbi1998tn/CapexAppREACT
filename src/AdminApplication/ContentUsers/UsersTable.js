import React, { useEffect, useState } from "react";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalUserEdit from "./ModalUserEdit";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [groups, setGroups] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/groupes/get");
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/departements/get");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDeleteUser = (user) => {
    console.log("handleDeleteUser called with user:", user);
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      fetch(
        `http://127.0.0.1:8000/user/delete/${userToDelete.id_utilisateur}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setReloadComponent(true);
          setDeleteStatus(true);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setDeleteStatus(false);
        })
        .finally(() => {
          setShowModal(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/user/get")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchData();
    fetchGroups();
    fetchDepartments();
    // Fetch data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId); // Cleanup the interval when component unmounts
    };
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.nom_utilisateur.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGroup === "" || user.groupe_utilisateur === selectedGroup) &&
      (selectedDepartment === "" ||
        user.role_utilisateur === selectedDepartment)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a.nom_utilisateur;
    const bValue = b.nom_utilisateur;
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  return (
    <div className="col-lg-12 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">Table d'Utilisateurs</h5>

          <div className="d-flex align-items-center mb-3">
            {/* Search Input */}

            <input
              type="text"
              placeholder="🔍 Rechercher par nom..."
              className="form-control me-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Group Select */}
            <select
              className="form-select me-3"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">Tous les groupes</option>
              {groups.map((group) => (
                <option key={group.id_groupe} value={group.nom_groupe}>
                  {group.nom_groupe}
                </option>
              ))}
            </select>

             {/* Department Select */}
             <select
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Tous les départements</option>
              {departments.map((department) => (
                <option
                  key={department.id_departement}
                  value={department.nom_departement}
                >
                  {department.nom_departement}
                </option>
              ))}
            </select>
          </div>

          {/* Success or error alert */}
          {deleteStatus === true && (
            <div className="alert alert-success" role="alert">
              Utilisateur supprimé avec succès.
            </div>
          )}
          {deleteStatus === false && (
            <div className="alert alert-danger" role="alert">
              Erreur lors de la suppression de l'utilisateur.{" "}
            </div>
          )}

          <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
              <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Nom</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Email</h6>
                  </th>
                 
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Role</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Statut</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0"></h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id_utilisateur}>
                    <td className="border-bottom-0">
                      <h6 className="fw-semibold mb-1">
                        {user.nom_utilisateur}
                      </h6>
                      <span className="fw-normal">{user.code_utilisateur}</span>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{user.email_utilisateur}</p>
                    </td>
                   
                    <td className="border-bottom-0">
                      {user.type_utilisateur === "Admin" ? (
                        <span className="badge bg-primary rounded-3 fw-semibold">
                          {user.type_utilisateur}
                        </span>
                      ) : user.type_utilisateur === "Utilisateur" ? (
                        <span className="badge bg-info rounded-3 fw-semibold">
                          {user.type_utilisateur}
                        </span>
                      ) : null}
                    </td>
                    <td className="border-bottom-0">
                      <span
                        className={`badge ${
                          user.statut_utilisateur === "Activé"
                            ? "bg-success"
                            : "bg-danger"
                        } rounded-3 fw-semibold`}
                      >
                        {user.statut_utilisateur}
                      </span>
                    </td>
                    <td className="border-bottom-0">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="/icons/edit.png"
                          alt="Modify"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                        />

                        <img
                          src="/icons/delete.png"
                          alt="Delete"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          onClick={() => {
                            console.log("Delete image clicked");
                            handleDeleteUser(user);
                          }} // Add this line
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalConfirmDelete
        showModal={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      {/* Use the ModalUserEdit component here */}
      <ModalUserEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UsersTable;
