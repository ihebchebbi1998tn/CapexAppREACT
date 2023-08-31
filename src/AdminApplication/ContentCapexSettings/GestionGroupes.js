import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GestionGroupes = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [DeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const [groupExistsAlertVisible, setGroupExistsAlertVisible] = useState(false);

  useEffect(() => {
    fetchGroupNames();
  }, []);

  const fetchGroupNames = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/groupes/get");
      const data = await response.json();
      setGroupNames(data);
    } catch (error) {
      console.error("Error fetching group names:", error);
    }
  };

  const handleGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleAddGroupName = async () => {
    if (newGroupName.trim() !== "") {
      const isGroupExists = groupNames.some(
        (group) => group.nom_groupe === newGroupName
      );

      if (isGroupExists) {
        setGroupExistsAlertVisible(true);
        setTimeout(() => {
          setGroupExistsAlertVisible(false);
        }, 3000);
        setSuccessAlertVisible(false); // Clear success alert
      } else {
        try {
          await fetch("http://127.0.0.1:8000/groupes/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom_groupe: newGroupName }),
          });
          setNewGroupName("");
          fetchGroupNames();
          setSuccessAlertVisible(true);
          setTimeout(() => {
            setSuccessAlertVisible(false);
          }, 3000);
          setGroupExistsAlertVisible(false); // Clear group exists alert
        } catch (error) {
          console.error("Error adding group name:", error);
        }
      }
    }
  };

  const handleDeleteGroupName = async (id, groupName) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le groupe  ?`
    );

    if (confirmDelete) {
      try {
        await fetch(`http://127.0.0.1:8000/groupes/delete/${id}`, {
          method: "DELETE",
        });
        fetchGroupNames();
        setDeleteAlertVisible(true);
        setTimeout(() => {
          setDeleteAlertVisible(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting group name:", error);
      }
    }
  };

  return (
    <div className="col-md-4 d-flex">
      <div className="card flex-grow-1">
        <div
          className="card-header"
          style={{ display: "grid", placeItems: "center" }}
        >
          <strong>Les Groupes Délice</strong>
        </div>
        <div
          className="card-body"
          style={{ maxHeight: "300px", overflowY: "scroll" }}
        >
          <div className="mb-3 d-flex align-items-center justify-content-end">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Nouveau nom du groupe.."
              value={newGroupName}
              onChange={handleGroupNameChange}
              required
            />
            <img
            src="/icons/add.png"
            alt="Delete"
            className="cursor-pointer"
            style={{ width: "30px", height: "30px" }}
            onClick={handleAddGroupName}
          />
          </div>
          <div
            id="success-alert"
            className={`alert alert-success ${
              successAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Groupe ajouté avec succès!
          </div>
          <div
            id="success-alert"
            className={`alert alert-warning ${
              DeleteAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Groupe supprimé avec succès!
          </div>
          <div
            id="group-exists-alert"
            className={`alert alert-danger ${
              groupExistsAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Le groupe existe déjà!
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nom de groupe</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groupNames.map((group) => (
                <tr key={group.id_groupe}>
                  <td>{group.nom_groupe}</td>
                  <td>
                    <img
                      src="/icons/delete.png"
                      alt="Delete"
                      className="cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleDeleteGroupName(group.id_groupe)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionGroupes;
