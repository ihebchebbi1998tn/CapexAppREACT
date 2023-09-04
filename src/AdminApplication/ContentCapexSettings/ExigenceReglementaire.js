import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ExigenceReglementaire = () => {
  const [newExigence, setNewExigence] = useState("");
  const [exigenceList, setExigenceList] = useState([]);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [exigenceExistsAlertVisible, setExigenceExistsAlertVisible] =
    useState(false);

  useEffect(() => {
    fetchExigenceList();
  }, []);

  const fetchExigenceList = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/exigences/get");
      const data = await response.json();
      setExigenceList(data);
    } catch (error) {
      console.error("Error fetching exigence list:", error);
    }
  };

  const handleExigenceChange = (event) => {
    setNewExigence(event.target.value);
  };

  const handleAddExigence = async () => {
    if (newExigence.trim() !== "") {
      const isExigenceExists = exigenceList.some(
        (exigence) => exigence.nom_exigence === newExigence
      );

      if (isExigenceExists) {
        setSuccessAlertVisible(false);
        setExigenceExistsAlertVisible(true);
        setTimeout(() => {
          setExigenceExistsAlertVisible(false);
        }, 3000);
      } else {
        try {
          await fetch("http://127.0.0.1:8000/exigences/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom_exigence: newExigence }),
          });
          setNewExigence("");
          fetchExigenceList();
          setSuccessAlertVisible(true);
          setTimeout(() => {
            setSuccessAlertVisible(false);
          }, 3000);
        } catch (error) {
          console.error("Error adding exigence:", error);
        }
      }
    }
  };

  const handleDeleteExigence = async (id) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette exigence ?`
    );

    if (confirmDelete) {
      try {
        await fetch(`http://127.0.0.1:8000/exigences/delete/${id}`, {
          method: "DELETE",
        });
        fetchExigenceList();
        setDeleteAlertVisible(true);
        setTimeout(() => {
          setDeleteAlertVisible(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting exigence:", error);
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
          <strong>Exigence réglementaire</strong>
        </div>
        <div
          className="card-body"
          style={{ maxHeight: "300px", overflowY: "scroll" }}
        >
          <div className="mb-3 d-flex align-items-center justify-content-end">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Nouvelle exigence.."
              value={newExigence}
              onChange={handleExigenceChange}
              required
            />
            <img
              src="/icons/add.png"
              alt="Delete"
              className="cursor-pointer"
              style={{ width: "30px", height: "30px" }}
              onClick={handleAddExigence}
            />
          </div>
          <div
            id="success-alert"
            className={`alert alert-success ${
              successAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Exigence ajoutée avec succès!
          </div>
          <div
            id="delete-alert"
            className={`alert alert-warning ${
              deleteAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Exigence supprimée avec succès!
          </div>
          <div
            id="exigence-exists-alert"
            className={`alert alert-danger ${
              exigenceExistsAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Cette exigence existe déjà!
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Liste des exigences</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exigenceList.map((exigence) => (
                <tr key={exigence.id_exigence}>
                  <td>{exigence.nom_exigence}</td>
                  <td>
                    <img
                      src="/icons/delete.png"
                      alt="Delete"
                      className="cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleDeleteExigence(exigence.id_exigence)}
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

export default ExigenceReglementaire;
