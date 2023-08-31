import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GestionDepartements = () => {
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [departmentNames, setDepartmentNames] = useState([]);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [DeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const [departmentExistsAlertVisible, setDepartmentExistsAlertVisible] =
    useState(false);

  useEffect(() => {
    fetchDepartmentNames();
  }, []);

  const fetchDepartmentNames = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/departements/get");
      const data = await response.json();
      setDepartmentNames(data);
    } catch (error) {
      console.error("Error fetching department names:", error);
    }
  };

  const handleDepartmentNameChange = (event) => {
    setNewDepartmentName(event.target.value);
  };

  const handleAddDepartmentName = async () => {
    if (newDepartmentName.trim() !== "") {
      const isDepartmentExists = departmentNames.some(
        (department) => department.nom_departement === newDepartmentName
      );

      if (isDepartmentExists) {
        setSuccessAlertVisible(false);
        setDepartmentExistsAlertVisible(true);
        setTimeout(() => {
          setDepartmentExistsAlertVisible(false);
        }, 3000);
      } else {
        try {
          await fetch("http://127.0.0.1:8000/departements/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom_departement: newDepartmentName }),
          });
          setNewDepartmentName("");
          fetchDepartmentNames();
          setSuccessAlertVisible(true);
          setTimeout(() => {
            setSuccessAlertVisible(false);
          }, 3000);
        } catch (error) {
          console.error("Error adding department name:", error);
        }
      }
    }
  };

  const handleDeleteDepartmentName = async (id) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le département ?`
    );

    if (confirmDelete) {
      try {
        await fetch(`http://127.0.0.1:8000/departements/delete/${id}`, {
          method: "DELETE",
        });
        fetchDepartmentNames();
        setDeleteAlertVisible(true);
        setTimeout(() => {
          setDeleteAlertVisible(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting department name:", error);
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
          <strong>Les Départements</strong>
        </div>
        <div
          className="card-body"
          style={{ maxHeight: "300px", overflowY: "scroll" }}
        >
          <div className="mb-3 d-flex align-items-center justify-content-end">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Nom du département.."
              value={newDepartmentName}
              onChange={handleDepartmentNameChange}
              required
            />
        
            <img
            src="/icons/add.png"
            alt="Delete"
            className="cursor-pointer"
            style={{ width: "30px", height: "30px" }}
            onClick={handleAddDepartmentName}
          />
          </div>
          <div
            id="success-alert"
            className={`alert alert-success ${
              successAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Département ajouté avec succès!
          </div>
          <div
            id="success-alert"
            className={`alert alert-warning ${
              DeleteAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Département supprimé avec succès!
          </div>
          <div
            id="department-exists-alert"
            className={`alert alert-danger ${
              departmentExistsAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Le département existe déjà!
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nom du département</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {departmentNames.map((department) => (
                <tr key={department.id_departement}>
                  <td>{department.nom_departement}</td>
                  <td>
                    <img
                      src="/icons/delete.png"
                      alt="Delete"
                      className="cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() =>
                        handleDeleteDepartmentName(department.id_departement)
                      }
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

export default GestionDepartements;
