import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../SessionContext";

const SettingsPageUser = () => {
  const { userData } = useUser();
  const userId = userData.id;
  const { updateSession } = useSession();
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    nom_utilisateur: "",
    code_utilisateur: "",
    email_utilisateur: "",
    mot_de_passe: "",
    role_utilisateur: "",
    groupe_utilisateur: "",
    statut_utilisateur: "",
  });

  const [categorieMessage, setCategorieMessage] = useState("");
  const [contenuMessage, setContenuMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/user/get/${userId}`
      );
      const user = response.data;

      setUserDetails({
        nom_utilisateur: user.nom_utilisateur,
        code_utilisateur: user.code_utilisateur,
        email_utilisateur: user.email_utilisateur,
        mot_de_passe: user.mot_de_passe,
        role_utilisateur: user.role_utilisateur,
        groupe_utilisateur: user.groupe_utilisateur,
        statut_utilisateur: user.statut_utilisateur,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleEnvoyerClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!categorieMessage || !contenuMessage) {
      setError("✘ Tous les champs doivent être remplis.");
      return;
    }

    const userNom = userData?.nom;
    const expediteurMessage = userNom;
    const recepteurMessage = "admin";
    const raisonMessage = "Mise à jour compte";
    const objetMessage = "empty";
    const sujetMessage = contenuMessage;
    const dateMessage = new Date().toLocaleString();
    const typeMessage = "important";
    const statutMessage = "En attente";

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/messages/create",
        {
          expediteur_message: expediteurMessage,
          recepteur_message: recepteurMessage,
          raison_message: raisonMessage,
          objet_message: objetMessage,
          sujet_message: sujetMessage,
          message_message: contenuMessage,
          date_message: dateMessage,
          type_message: typeMessage,
          statut_message: statutMessage,
        }
      );

      setSuccess("Demande de modification envoyer avec success ✔");
      setError(null);

      console.log("Message created successfully:", response.data);
    } catch (error) {
      console.error("Error creating message:", error);
      setError("Impossible de créer votre demande ✘");
      setSuccess(null);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="col-12 col-lg-12 col-xl-8 mx-auto">
          <div className="my-4">
            <form>
              <div className="form-row mb-3">
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="nom_utilisateur">Nom</label>
                    <input
                      type="text"
                      id="nom_utilisateur"
                      name="nom_utilisateur"
                      className="form-control"
                      placeholder=""
                      value={userDetails.nom_utilisateur}
                      readOnly
                      style={{ backgroundColor: "#f2f2f2", color: "#666" }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="code_utilisateur">Code</label>
                    <input
                      type="text"
                      id="code_utilisateur"
                      name="code_utilisateur"
                      className="form-control"
                      placeholder=""
                      value={userDetails.code_utilisateur}
                      readOnly
                      style={{ backgroundColor: "#f2f2f2", color: "#666" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email_utilisateur">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email_utilisateur"
                  placeholder=""
                  value={userDetails.email_utilisateur}
                  readOnly
                  style={{ backgroundColor: "#f2f2f2", color: "#666" }}
                />
              </div>
              <div className="form-row mb-3">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="role_utilisateur">Département</label>
                    <select
                      id="role_utilisateur"
                      className="form-control"
                      value={userDetails.role_utilisateur}
                      readOnly
                      style={{ backgroundColor: "#f2f2f2", color: "#666" }}
                    >
                      <option value="">Sélectionnez un département</option>
                      <option value="Department 1">Department 1</option>
                      <option value="Department 2">Department 2</option>
                      <option value="Department 3">Department 3</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="groupe_utilisateur">Groupe</label>
                    <select
                      id="groupe_utilisateur"
                      className="form-control"
                      value={userDetails.groupe_utilisateur}
                      readOnly
                      style={{ backgroundColor: "#f2f2f2", color: "#666" }}
                    >
                      <option value="">Sélectionner un groupe</option>
                      <option value="Group 1">Group 1</option>
                      <option value="Group 2">Group 2</option>
                      <option value="Group 3">Group 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="row mb-7">
                <div className="col-md-6">
                  <div className="row mb-3">
                    <div className="form-group">
                      <label htmlFor="categorie">Catégorie de la demande</label>
                      <select
                        id="categorie_message"
                        className="form-control"
                        value={categorieMessage}
                        onChange={(e) => setCategorieMessage(e.target.value)}
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="Changement de l'email">Changement de l'email</option>
                        <option value="Changement de Mot de passe">Changement de Mot de passe</option>
                        <option value="Changement de département">Changement de département</option>
                        <option value="Changement du groupe délice">Changement du groupe délice</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contenu_message">Votre demande</label>
                    <textarea
                      className="form-control"
                      id="contenu_message"
                      rows={4}
                      value={contenuMessage}
                      onChange={(e) => setContenuMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Changement d'information personnel n'est pas autorisé ✘</p>
                  <p className="small text-muted mb-2">Pour faire n'importe quel changement dans votre compte:</p>
                  <ul className="small text-muted pl-4 mb-0">
                    <li>Choisir la catégorie concernée</li>
                    <li>Ecrire le changement souhaité</li>
                    <li>Le <strong>Département IT</strong> va faire la modification à votre place après vérification.</li>
                  </ul>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" onClick={handleEnvoyerClick}>
                  <i className="ti ti-send"></i> Envoyer ma demande
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPageUser;
