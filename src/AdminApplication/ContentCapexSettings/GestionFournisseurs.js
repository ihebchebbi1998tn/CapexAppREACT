import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const GestionFournisseurs = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [message, setMessage] = useState(null);
  const [fournisseurName, setFournisseurName] = useState("");
  const [imageURL, setImageURL] = useState(""); // New state to store image URL

  const handleDeleteFournisseur = async (fournisseurId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/fournisseurs/delete/${fournisseurId}`
      );

      setMessage({
        level: "success",
        text: "Fournisseur supprimé avec succès.",
      });
      if (response.data.message.level === "success") {
        loadFournisseurs();
      }
    } catch (error) {
      console.error("Error deleting fournisseur:", error);
    }
    setTimeout(() => {
      setMessage({ level: null, text: "" });
    }, 6000);
  };

  const loadFournisseurs = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/fournisseurs/get"
      );
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Error loading fournisseurs:", error);
    }
  };

  useEffect(() => {
    loadFournisseurs();
  }, []);

  const handleAddFournisseur = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fournisseurs/create",
        {
          nom_fournisseur: fournisseurName,
          photo_fournisseur: imageURL, // Use the entered URL as the image
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({
        level: "success",
        text: "Fournisseur ajouté avec succès.",
      });
      if (response.data.message.level === "success") {
        loadFournisseurs();
        setFournisseurName("");
        setImageURL(""); // Clear the imageURL after adding
      }
    } catch (error) {
      console.error("Error adding fournisseur:", error);
      setMessage({
        level: "danger",
        text: "Erreur lors de l'ajout du fournisseur.",
      });
    }

    setTimeout(() => {
      setMessage({ level: null, text: "" });
    }, 6000);
  };

  return (
    <div className="col-md-8 d-flex">
      <div className="card flex-grow-1">
        <div
          className="card-header"
          style={{ display: "grid", placeItems: "center" }}
        >
          <strong>Gestion des Fournisseurs</strong>
        </div>
        <div
          className="card-body"
          style={{ maxHeight: "300px", overflowY: "scroll" }}
        >
          {message && (
            <div className={`alert alert-${message.level}`}>{message.text}</div>
          )}
          <form encType="multipart/form-data">
            <div className="mb-3">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-3"
                  placeholder="Nom du fournisseur"
                  value={fournisseurName}
                  onChange={(e) => setFournisseurName(e.target.value)}
                  required
                />
                <input
                  type="url" // Use 'url' type for entering image URLs
                  className="form-control me-3"
                  placeholder="URL de l'image"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  className="cursor-pointer"
                  style={{ width: "30px", height: "30px" }}
                  onClick={handleAddFournisseur}
                />
              </div>
            </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Evaluation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurs.map((fournisseur) => (
                <tr key={fournisseur.id_fournisseur}>
                  <td>
                    <img
                      src={fournisseur.photo_fournisseur}
                      alt={fournisseur.nom_fournisseur}
                      style={{ width: "70px", height: "30px" }}
                    />
                  </td>
                  <td>{fournisseur.nom_fournisseur}</td>
                  <td>{fournisseur.evaluation_fournisseur}</td>
                  <td>
                  <img
                      src="/icons/delete.png"
                      alt="Delete"
                      className="cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() =>
                        handleDeleteFournisseur(fournisseur.id_fournisseur)
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

export default GestionFournisseurs;
