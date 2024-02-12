import React, { useState, useEffect } from "react";
import axios from "axios";
import GestionIp from "./GestionIp";
import "./reglageavance.css"; // Add your custom CSS file here
import { useUser } from "../../UserContext";

const ModalReglageavance = ({ showModal, handleClose }) => {
  const [otpAdvanced, setOtpAdvanced] = useState("0");
  const [ipAdvanced, setIpAdvanced] = useState("0");
  const [uploadapiAdvanced, setUploadapiAdvanced] = useState("");
  const [showGestionIp, setShowGestionIp] = useState(false);
  const { userData } = useUser(); // Access userData from UserContext
  const userPassword = userData?.pass;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/advanced/list")
      .then((response) => {
        const latestAdvanced = response.data[0];
        if (latestAdvanced) {
          setOtpAdvanced(latestAdvanced.otp_advanced);
          setIpAdvanced(latestAdvanced.ip_advanced);
          setUploadapiAdvanced(latestAdvanced.uploadapi_advanced);
        }
      })
      .catch((error) => {
        console.error("Error fetching latest Advanced entity:", error);
      });
  }, []);

  const handleToggleOtp = () => {
    const enteredPassword = prompt("Veuillez entrer votre mot de passe :");

    if (enteredPassword === userPassword) {
    const newOtpValue = otpAdvanced === "1" ? "0" : "1";
    setOtpAdvanced(newOtpValue);
    saveChangesToDatabase(newOtpValue, ipAdvanced);
  } else {
    alert("Mot de passe incorrect. Impossible de désactiver l'authentification OTP.");
  }
  };

  const handleToggleIp = () => {
    const enteredPassword = prompt("Veuillez entrer votre mot de passe :");

    if (enteredPassword === userPassword) {
    const newIpValue = ipAdvanced === "1" ? "0" : "1";
    setIpAdvanced(newIpValue);
    saveChangesToDatabase(otpAdvanced, newIpValue);
  } else {
    alert("Mot de passe incorrect. Impossible de désactiver la géolocalisation IP.");
  }
  };

  const handleApiChange = (event) => {
    setUploadapiAdvanced(event.target.value);
  };

  const saveChangesToDatabase = (otpValue, ipValue) => {
    const data = {
      otp_advanced: otpValue,
      ip_advanced: ipValue,
      uploadapi_advanced: uploadapiAdvanced,
    };
    

    
    axios
      .put("http://127.0.0.1:8000/advanced/update", data)
      .then((response) => {
        console.log("Changes saved to the database:", response.data);
      })
      .catch((error) => {
        console.error("Error saving changes to the database:", error);
      });
    
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content content-settings">
          <div className="modal-header">
            <h3 className="modal-title text-white">
              <i className="fa fa-cog fa-spin fa-1x fa-f"></i> Réglages avancés
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            onClick={() => setShowGestionIp(true)}
          >
            <button className="btn btn-gradient">Gérer les adresses IP</button>
          </div>
          <div className="modal-body content-settings">
            <div>
              <strong className="mb-0">Sécurité</strong>
              <p>Ici vous pouvez changer la sécurité de l'application.</p>
              <div className="list-group content-settings mb-5 shadow">
                <div className="list-group-item content-settings">
                  <div className="row align-items-center">
                    <div className="col content-settings">
                      <strong className="mb-0">Authentification OTP</strong>
                      <p className="text-muted mb-0">
                        Activer ou désactiver les authentifications par mot de
                        passe à usage unique.
                      </p>
                    </div>
                    <div className="col-auto content-settings">
                      <div className="form-check form-switch content-settings">
                      <button
                type="button"
                className={`btn ${
                  otpAdvanced === "1" ? "btn-success btn-sm" : "btn-secondary btn-sm"
                } btn-lg `}
                onClick={handleToggleOtp}
              >
                {otpAdvanced === "1" ? "ACTIVÉ" : "DÉSACTIVÉ"}
              </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item content-settings">
                  <div className="row align-items-center">
                    <div className="col content-settings">
                      <strong className="mb-0">Géolocalisation IP</strong>
                      <p className="text-muted mb-0">
                        Activer ou désactiver la géolocalisation IP pour
                        permettre l'accès à l'application.
                      </p>
                    </div>
                    <div className="col-auto content-settings">
                      <div className="form-check form-switch content-settings">
                      <button
                type="button"
                className={`btn ${
                  ipAdvanced === "1" ? "btn-success btn-sm" : "btn-secondary btn-sm"
                } btn-lg `}
                onClick={handleToggleIp}
              >
                {ipAdvanced === "1" ? "ACTIVÉ" : "DÉSACTIVÉ"}
              </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <strong className="mb-0">Téléchargements de fichiers</strong>
              <div className="list-group content-settings mb-1 shadow">
                <div className="list-group-item content-settings">
                  <div className="row align-items-center">
                    <div className="col content-settings">
                      <strong className="mb-0">Bytescale API</strong>
                      <p className="text-muted mb-0">
                        Ici, vous pouvez modifier la clé API.
                      </p>
                    </div>
                    <div>
                      <input
                        type="password"
                        className="form-control"
                        id="API"
                        placeholder="public_FW25bnA4hNsPkpq52uhJfQXLZE2w"
                        value={uploadapiAdvanced}
                        onChange={handleApiChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer content-settings">
            <button
              type="button"
              className="btn btn-secondary content-settings"
              data-dismiss="modal"
              onClick={handleClose}
            >
              ✘
            </button>
            <button
              type="button"
              className="btn btn-primary content-settings"
              onClick={saveChangesToDatabase}
            >
              ✔
            </button>
          </div>
        </div>
      </div>
      <GestionIp
        showModal={showGestionIp}
        handleClose={() => setShowGestionIp(false)}
      />
    </div>
  );
};

export default ModalReglageavance;
