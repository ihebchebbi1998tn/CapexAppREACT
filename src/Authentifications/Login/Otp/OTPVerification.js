import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Otp.css";
import { useSession, setSessionData } from "../../../SessionContext";
import { useUser, setUserData } from "../../../UserContext";

const OTPVerification = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [active, setActive] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { updateSession } = useSession();
  const [message, setMessage] = useState(null);


  useEffect(() => {
    // This code will run after the component has been rendered

    // Call the function to fetch and display the message
    fetchAndDisplayMessage();
  }, []); // The empty dependency array ensures that this effect runs only once

  
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;

    if (value !== "" && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOTP(newOTP);

    const isComplete = newOTP.every((value) => value !== "");
    setActive(isComplete);
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index > 0) {
      const newOTP = [...otp];
      newOTP[index] = "";
      document.getElementById(`otp-input-${index - 1}`).focus();
      setOTP(newOTP);
      setActive(false);
    }
  };

  const validCodes = [
    "4514",
    "5748",
    "6514",
    "3254",
    "7845",
    "3547",
    "1425",
    "7584",
    "0132",
    "1974",
    "4572",
  ];

  const checkOTP = () => {
    const enteredCode = otp.join("");
    const remainingAttempts = 3 - (failedAttempts + 1);

    if (validCodes.includes(enteredCode)) {
      navigate("/authentificationloading");
    } else {
      setFailedAttempts((prevAttempts) => prevAttempts + 1);

      if (remainingAttempts > 0) {
        setMessage({
          text: `Code incorrect. Veuillez réessayer. Nombre de tentatives restantes : ${remainingAttempts}`,
          level: "warning",
        });
      } else {
        alert("Vous avez atteint le nombre maximum de tentatives. Redirection vers la page d'authentification.");
      
        localStorage.removeItem("userData");
        updateUser("", "", "", "");
        updateSession("", "Code OTP incorrect ✘");
        navigate("/");
      }
    }
  };


    
   
      const fetchAndDisplayMessage = () => {
        fetch("http://localhost/sendemail.php?recipient=erzerino2@gmail.com")
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setMessage({
          text: "Le code OTP a été envoyé à votre adresse e-mail.",
          level: "success",
        });

      };

    

  return (
    <div className="otp-page">
      <div className="containerotp">
        <header>
          <i className="bx bxs-check-shield">
            <img src="/assets/logocapex.png" width="200" alt="" />
          </i>
        </header>
        {message && (
          <div className={`alert alert-${message.level}`}>
            {message.text}
          </div>
        )}
        <h4>Entrez le code OTP</h4>
        <form className="formotp" action="#">
          <div className="input-field">
            {otp.map((value, index) => (
              <input
                id={`otp-input-${index}`}
                key={index}
                type="number"
                value={value}
                onChange={(e) => handleInputChange(index, e)}
                onKeyUp={(e) => handleBackspace(index, e)}
                maxLength="1"
                className="input-style"
              />
            ))}
          </div>
          <button
            className={active ? "active" : ""}
            disabled={!active}
            onClick={checkOTP}
          >
            Vérifier le code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
