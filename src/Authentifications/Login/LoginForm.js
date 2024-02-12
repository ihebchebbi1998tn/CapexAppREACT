import React, { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { useSession } from "../../SessionContext";
import axios from "axios";
import "./PasswordInput.css";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [stayLogged, setStayLogged] = useState(true); // State for checkbox
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { sessionData } = useSession();
  const [otpAdvanced, setOtpAdvanced] = useState("0");  // Add these lines
  const [ipAdvanced, setIpAdvanced] = useState("0");    // Add these lines
  const [uploadapiAdvanced, setUploadapiAdvanced] = useState("");  // Add these lines
  const disconnected15min = sessionData.loginoutInactive;
  const disconnected = sessionData.Logingout;

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("sessionData");
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => {
      // Clean up the timer if the component unmounts before the timeout
      clearTimeout(timer);
    };
  }, []);

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

  const handleStayLoggedChange = () => {
    setStayLogged(!stayLogged); // Toggle the state of the checkbox
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/advanced/list");
        const latestAdvanced = response.data[0];
        if (latestAdvanced) {
          setOtpAdvanced(latestAdvanced.otp_advanced);
          setIpAdvanced(latestAdvanced.ip_advanced);
          setUploadapiAdvanced(latestAdvanced.uploadapi_advanced);
        }
      } catch (error) {
        console.error("Error fetching latest Advanced entity:", error);
      }
    };
  
    const intervalId = setInterval(fetchData, 3000);
    console.log(otpAdvanced);
    // Cleanup: Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [otpAdvanced, ipAdvanced, uploadapiAdvanced]); // Include state variables in the dependency array
  
  
  const handleSignInClick = async () => {
    const StayLoggedOrNo = stayLogged ? "Oui" : "Non"; // Set the variable based on checkbox state
  
    if (!username || !password) {
      setAlert({
        type: "danger",
        message: "✘ Veuillez remplir tous les champs.",
      });
      setTimeout(() => {
        setAlert(null);
      }, 6000);
      return;
    }
  
    try {
      const response = await axios.get("http://127.0.0.1:8000/user/get");
      const users = response.data;
  
      const authenticatedUser = users.find(
        (user) =>
          user.email_utilisateur === completeEmail() &&
          user.mot_de_passe === password
      );
  
      if (authenticatedUser) {
        if (authenticatedUser.statut_utilisateur === "Désactivé") {
          setAlert({ type: "danger", message: "Ce compte a été désactivé." });
        } else {
          updateUser(
            authenticatedUser.nom_utilisateur,
            authenticatedUser.email_utilisateur,
            password,
            authenticatedUser.id_utilisateur,
            authenticatedUser.type_utilisateur,
            authenticatedUser.groupe_utilisateur,
            StayLoggedOrNo,
            authenticatedUser.image_utilisateur
          );
  
          console.log(otpAdvanced);
          if (otpAdvanced === "1") {
            setTimeout(() => {
              navigate(`/otpverif`);
            }, 3000);
          } else {
            setTimeout(() => {
              navigate(`/authentificationloading`);
            }, 3000);
          }
        }
      } else {
        setAlert({
          type: "danger",
          message: "✘ Les informations d'identification ne correspondent pas.",
        });
        setTimeout(() => {
          setAlert(null);
        }, 6000);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAlert({
        type: "danger",
        message: "Une erreur s'est produite lors de la connexion.",
      });
    }
  };
  
  return (
    <>
      {alert.type && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

{disconnected15min !== "" && (
  <div className={`alert alert-warning`} role="alert">
    {disconnected15min}
  </div>
)}

{disconnected !== "" && (
  <div className={`alert alert-success`} role="alert">
    {disconnected}
  </div>
)}
      <div className="mb-3">
        <label  htmlFor="exampleInputEmail1" className="form-label">
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
            defaultChecked={stayLogged}
            onChange={handleStayLoggedChange}
          />
          <label
            className="form-check-label text-dark"
            htmlFor="flexCheckChecked"
          >
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
        <FontAwesomeIcon icon={faRightToBracket} className="me-1" />{" "}
        S'identifier
      </button>
    </>
  );
};

export default LoginForm;
