import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useUser } from "../../UserContext"; // Import useUser from your UserContext

import axios from "axios"; // Import axios for making API requests
import "./PasswordInput.css";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" }); // State for alert message
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { updateUser } = useUser(); // Access the updateUser function from UserContext

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value.replace("@", "");
    setUsername(inputUsername);
  };

  const completeEmail = () => {
    return username + "@groupedelice.com.tn";
  };

  const handleSignInClick = async () => {
    try {
      // Fetch all users
      const response = await axios.get("http://127.0.0.1:8000/user/get");
      const users = response.data;

      // Search for a user with matching email and password
      const authenticatedUser = users.find(
        (user) => user.email_utilisateur === completeEmail() && user.mot_de_passe === password && user.type_utilisateur === "Admin"
      );

      if (authenticatedUser) {
        // User is authenticated
        setAlert({ type: "success", message: "Utilisateur connecté avec succès !" });
        updateUser(authenticatedUser.email_utilisateur,authenticatedUser.id_utilisateur,authenticatedUser.type_utilisateur); // Set user information

        setTimeout(() => {
          navigate(`/authentificationloading`);
        }, 3000);

      } else {
        // User not found or credentials do not match
        setAlert({ type: "error", message: "Les informations d'identification ne correspondent pas." });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAlert({ type: "error", message: "Une erreur s'est produite lors de la connexion." });
    }
  };


  return (
    <>
      {/* Alert message */}
      {alert.type && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Adresse e-mail
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={handleUsernameChange}
          />
          <span className="input-group-text">@groupedelice.com.tn</span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Mot de passe
        </label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="eye-icon-btn"
            onClick={handleTogglePassword}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="form-check">
          <input
            className="form-check-input primary"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            defaultChecked
          />
          <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
            Se souvenir de cet appareil
          </label>
        </div>
        <a className="text-primary fw-bold" href="./prblmauthentification">
          Problème d'authentification ?
        </a>
      </div>
      <button
        onClick={handleSignInClick}
        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
      >
        <FontAwesomeIcon icon={faRightToBracket} className="me-1" /> S'identifier
      </button>
    </>
  );
};

export default LoginForm;
