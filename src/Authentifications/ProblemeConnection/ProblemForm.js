import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProblemForm = () => {
  const [email, setEmail] = useState("");
  const [foundPassword, setFoundPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordRetrieval = async () => {
    if (!email) {
      // If the email input is empty, display a message in French
      setMessage({
        text: "Veuillez remplir le champ de l'adresse e-mail ✘",
        level: "warning",
      });setTimeout(() => {
        setMessage(null);
      }, 6000);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/user/password-retrieval", {
        email: email,
      });

      if (response.data.password) {
        setFoundPassword(response.data.password);

        // Make an HTTP GET request to your PHP script with email and password as parameters
        fetch(`http://localhost/recuppassword.php?recipient=erzerino2@gmail.com&password=${response.data.password}`)
          .then((response) => response.text())
          .then((data) => {
           
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        console.log("Password:", response.data.password);
        setMessage({
          text: "Si votre email est dans notre base de données, vous recevrez votre mot de passe sous peu ✔",
          level: "success",
        });setTimeout(() => {
          setMessage(null);
        }, 6000);
      } else {
        setMessage({
          text: "Cet email n'existe pas dans notre base de données ✘",
          level: "danger",
        });setTimeout(() => {
          setMessage(null);
        }, 6000);
      }
    } catch (error) {
      console.error("An error occurred while retrieving the password.");
    }
  };

  useEffect(() => {
    // You can add any additional logic here that should run on component load
  }, []);

  const navigateToHome = () => {
    window.location.href = "/";
  };
  return (
    <div>
      <div className="mb-2">
        {message && (
          <div className={`alert alert-${message.level}`}>
            {message.text}
          </div>
        )}
        <label htmlFor="email" className="form-label">
          Adresse e-mail
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between mb-4">
      <button
          type="button"
          className="btn btn-warning w-25 py-2 fs-2 mb-4 rounded-2 mx-2"
          onClick={navigateToHome} // Programmatically navigate to the home page
        >
          ✘ Annuler
        </button>
        <button
          type="button"
          className="btn btn-primary w-75 py-2 fs-4 mb-4 rounded-2 mx-2"
          onClick={handlePasswordRetrieval}
        >
          <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Récuperer le mot de passe
        </button>
      </div>
    </div>
  );
};

export default ProblemForm;
