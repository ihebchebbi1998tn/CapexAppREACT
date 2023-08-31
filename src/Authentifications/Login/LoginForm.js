import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PasswordInput.css";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value.replace("@", ""); // Remove "@" if entered
    setUsername(inputUsername);
  };

  const completeEmail = () => {
    return username + "@groupedelice.com.tn";
  };

  const handleSignInClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8001/user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_utilisateur: completeEmail(),
          mot_de_passe: password,
        }),
      });
  
      const data = await response.json();
  
      if (data.authenticated) {
        navigate("/authentificationloading");
      } else {
        alert("User does not exist or incorrect credentials.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <form>
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
    </form>
  );
};

export default LoginForm;
