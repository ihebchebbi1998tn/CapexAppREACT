import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import axios from "axios";

const SettingsPage = () => {
  const { userData } = useUser(); // Access userData from UserContext
  const [departments, setDepartments] = useState([]);
    const [groups, setGroups] = useState([]);

  const userId = userData.id; // Updated to userData.id

  const [userDetails, setUserDetails] = useState({
    nom_utilisateur: "",
    code_utilisateur: "",
    email_utilisateur: "",
    role_utilisateur: "",
    groupe_utilisateur: "",
  });

  const fetchDepartments = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/departements/get");
        const data = await response.json();
        setDepartments(data);
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
};

const fetchGroups = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/groupes/get");
        const data = await response.json();
        setGroups(data);
    } catch (error) {
        console.error("Error fetching groups:", error);
    }
};

  useEffect(() => {
    // Fetch user details based on userId
    fetchDepartments();
    fetchGroups();
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/get/${userId}`);
        const user = response.data; // Assuming the API response is an object with user details

        // Update the state with user details
        setUserDetails({
          nom_utilisateur: user.nom_utilisateur,
          code_utilisateur: user.code_utilisateur,
          email_utilisateur: user.email_utilisateur,
          role_utilisateur: user.role_utilisateur,
          groupe_utilisateur: user.groupe_utilisateur,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);


  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="col-12 col-lg-12 col-xl-8 mx-auto">
          <div className="my-4">
            <form>
              <div className="form-row mb-3">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstname">Nom</label>
                    <input
                      type="text"
                      id="nom_utilisateur"
                      className="form-control"
                      placeholder="Brown"
                      value={userDetails.nom_utilisateur}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastname">Code</label>
                    <input
                      type="text"
                      id="code_utilisateur"
                      className="form-control"
                      placeholder="Asher"
                      value={userDetails.code_utilisateur}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputEmail4">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email_utilisateur"
                  placeholder="brown@asher.me"
                  value={userDetails.email_utilisateur}
                />
              </div>
              <div className="form-row mb-3">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState5">Département</label>
                    <select
                      id="role_utilisateur"
                      className="form-control"
                      value={userDetails.role_utilisateur}
                    >
                        <option value="">Sélectionnez un département</option>
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
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState5">Groupe</label>
                    <select
                      id="groupe_utilisateur"
                      className="form-control"
                      value={userDetails.groupe_utilisateur}
                    >
                      <option value="">Sélectionner un groupe</option>
                                        {groups.map((group) => (
                                            <option key={group.id_groupe} value={group.nom_groupe}>
                                                {group.nom_groupe}
                                            </option>
                                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword4">Ancien mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword5">Nouveau mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword6">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword6"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Exigences du mot de passe</p>
                  <p className="small text-muted mb-2">
                    Pour créer un nouveau mot de passe, vous devez respecter
                    toutes les exigences suivantes :
                  </p>
                  <ul className="small text-muted pl-4 mb-0">
                    <li>Minimum 8 caractères</li>
                    <li>Au moins un caractère spécial</li>
                    <li>Au moins un chiffre</li>
                    <li>
                      Ne peut pas être identique à un mot de passe précédent
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  <i className="ti ti-device-floppy"></i> Sauvegarder
                </button>
                <button type="submit" className="btn btn-danger">
                  Désactivez mon compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
