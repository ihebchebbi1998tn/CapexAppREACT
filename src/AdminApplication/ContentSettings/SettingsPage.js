import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSession } from "../../SessionContext";

const SettingsPage = () => {
  const { userData } = useUser();
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const userId = userData.id;
  const { updateSession } = useSession();
  const { updateUser } = useUser(); // Access the updateUser function from UserContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [userDetails, setUserDetails] = useState({
    nom_utilisateur: "",
    code_utilisateur: "",
    email_utilisateur: "",
    mot_de_passe: "",
    role_utilisateur: "",
    groupe_utilisateur: "",
    statut_utilisateur: "",
  });

  const [enteredOldPassword, setEnteredOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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
    fetchDepartments();
    fetchGroups();

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

    fetchUserDetails();
  }, [userId]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0.9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmNewPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword && !validatePassword(newPassword)) {
      setError("Le nouveau mot de passe ne respecte pas les critères.");
      return;
    }

    const updatedUserDetails = {
      nom_utilisateur: userDetails.nom_utilisateur,
      code_utilisateur: userDetails.code_utilisateur,
      email_utilisateur: userDetails.email_utilisateur,
      role_utilisateur: userDetails.role_utilisateur,
      groupe_utilisateur: userDetails.groupe_utilisateur,
      statut_utilisateur: userDetails.statut_utilisateur,
    };

    if (newPassword) {
      updatedUserDetails.nouveau_mot_de_passe = newPassword;
    }

    if (enteredOldPassword) {
      if (enteredOldPassword !== userDetails.mot_de_passe) {
        setError("L'ancien mot de passe ne correspond pas.");
        return;
      }
      updatedUserDetails.mot_de_passe = enteredOldPassword;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/user/update/${userId}`,
        updatedUserDetails
      );
      // Handle a successful profile update
      setSucces("La mise à jour est réussie.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Pour modifier votre profil, entrez votre mot de passe actuel.      ");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword && !validatePassword(newPassword)) {
      setError("Le nouveau mot de passe ne respecte pas les critères.");
      return;
    }

    const updatedUserDetails = {
      nouveau_mot_de_passe: newPassword,
    };

    if (enteredOldPassword) {
      if (enteredOldPassword !== userDetails.mot_de_passe) {
        setError("L'ancien mot de passe ne correspond pas.");
        return;
      }
      updatedUserDetails.mot_de_passe = enteredOldPassword;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/user/update/${userId}`,
        updatedUserDetails
      );
      // Handle a successful password update
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  const handleDeactivateAccount = () => {
    const enteredPassword = window.prompt(
      "Veuillez entrer votre mot de passe pour désactiver votre compte"
    );

    if (enteredPassword !== null) {
      // User entered a password
      deactivateAccount(enteredPassword);
      console.log(enteredPassword);
    }
  };

  const deactivateAccount = async (password) => {
    if (password === userDetails.mot_de_passe) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/user/desactivate/${userId}`
        );
        // Handle a successful account deactivation
        console.log("Account deactivated successfully");
        // You can perform any additional actions on successful deactivation if needed
        logout();
      } catch (error) {
        console.error("Error deactivating account:", error);
        setError(
          "Erreur lors de la désactivation du compte. Veuillez réessayer."
        );
      }
    } else {
      setError(
        "Le mot de passe saisi ne correspond pas à votre mot de passe actuel."
      );
    }
  };

  const handleConfirmDeactivation = async () => {
    if (enteredOldPassword === userDetails.mot_de_passe) {
      setShowConfirmationDialog(true);
    } else {
      setError("L'ancien mot de passe ne correspond pas.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    updateUser("", "", "", ""); // Set user information (if needed)
    updateSession("Ce compte a été désactivé avec succès ✓", "");
    navigate("/login"); // Navigate to the login page or any other appropriate page
  };

   // Clear the success and error messages after 6 seconds
   setTimeout(() => {
    setError(null);
    setSucces(null);
  }, 7000);

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="col-12 col-lg-12 col-xl-8 mx-auto">
          <div className="my-4">
            <form onSubmit={handleUpdateProfile}>
              <div className="form-row mb-3">
                {succes && (
                  <div className="alert alert-success" role="alert">
                    {succes}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                    <label htmlFor="groupe_utilisateur">Groupe</label>
                    <select
                      id="groupe_utilisateur"
                      className="form-control"
                      value={userDetails.groupe_utilisateur}
                      onChange={handleInputChange}
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
                    <label htmlFor="mot_de_passe">Ancien mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="mot_de_passe"
                      value={enteredOldPassword}
                      onChange={(e) => setEnteredOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nouveau_mot_de_passe">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="nouveau_mot_de_passe"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirme_mot_de_passe">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirme_mot_de_passe"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Exigences du mot de passe</p>
                  <p className="small text-muted mb-2">
                    Pour créer un nouveau mot de passe, vous devez respecter
                    toutes les exigences suivantes:
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
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  <i className="ti ti-device-floppy"></i> Sauvegarder
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeactivateAccount}
                >
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
