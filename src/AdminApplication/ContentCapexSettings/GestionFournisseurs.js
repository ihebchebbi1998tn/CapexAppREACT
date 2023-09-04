import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import axios from "axios";

const GestionFournisseurs = () => {
  const [nomFournisseur, setNomFournisseur] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [message, setMessage] = useState(null);

  const handleNomFournisseurChange = (event) => {
    setNomFournisseur(event.target.value);
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAddFournisseur = async () => {
    const formData = new FormData();
    formData.append("nom_fournisseur", nomFournisseur);
    formData.append("photo_fournisseur", imageFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fournisseurs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message.text);
      if (response.data.message.level === "success") {
        // If successful, refresh the fournisseurs list
        loadFournisseurs();
        setNomFournisseur("");
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error adding fournisseur:", error);
    }
  };

  const handleDeleteFournisseur = async (fournisseurId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/fournisseurs/delete/${fournisseurId}`
      );

      setMessage(response.data.message.text);
      if (response.data.message.level === "success") {
        // If successful, refresh the fournisseurs list
        loadFournisseurs();
      }
    } catch (error) {
      console.error("Error deleting fournisseur:", error);
    }
  };

  const loadFournisseurs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/fournisseurs/get");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Error loading fournisseurs:", error);
    }
  };

  useEffect(() => {
    loadFournisseurs();
  }, []);

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
          <form encType="multipart/form-data">
            <div className="mb-3">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-3"
                  placeholder="Nom du fournisseur"
                  value={nomFournisseur}
                  onChange={handleNomFournisseurChange}
                  required
                />
                <input
                  type="file"
                  className="form-control me-3"
                  accept="image/*"
                  onChange={handleImageFileChange}
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
          {message && (
            <div className={`alert alert-${message.level}`}>
              {message.text}
            </div>
          )}
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
                      src={`/uploads/${fournisseur.photo_fournisseur}`}
                      alt={fournisseur.nom_fournisseur}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>
                  <td>{fournisseur.nom_fournisseur}</td>
                  <td>{fournisseur.evaluation_fournisseur}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleDeleteFournisseur(fournisseur.id_fournisseur)}
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
    