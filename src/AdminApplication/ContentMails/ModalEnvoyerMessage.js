import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ModalEnvoyerMessage = ({ showModal, handleClose }) => {
  const [selectedAbout, setSelectedAbout] = useState("");
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [showSubProjectInput, setShowSubProjectInput] = useState(false);
  const [showCostCenterInput, setShowCostCenterInput] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [name, setName] = useState("Iheb Chebbi");

  const iconStyle = {
    marginRight: "0.5rem", // Adjust the margin as needed
  };

  const handleSelectChange = (e) => {
    setSelectedAbout(e.target.value);

    // Reset all input fields to not show by default
    setShowProjectInput(false);
    setShowSubProjectInput(false);
    setShowCostCenterInput(false);

    // Determine which input field to show based on the selected option
    if (e.target.value === "projet") {
      setShowProjectInput(true);
    } else if (e.target.value === "sous_projet") {
      setShowSubProjectInput(true);
    } else if (e.target.value === "centre_de_cout") {
      setShowCostCenterInput(true);
    }
  };

  const handleUrgentToggle = () => {
    setIsUrgent(!isUrgent);
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Envoyer un message</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {/* First Form */}
            <form>
              <div className="form-group mb-3">
                <input
                  name="À"
                  type="email"
                  className="form-control"
                  placeholder="À"
                />
              </div>
              <div className="form-group mb-3">
                <select
                  className="form-control"
                  id="exigenceSelect"
                  value={selectedAbout}
                  onChange={handleSelectChange}
                >
                  <option value="">Choisissez le sujet de votre message</option>
                  <option value="projet">À propos d'un projet</option>
                  <option value="sous_projet">À propos d'un sous-projet</option>
                  <option value="centre_de_cout">À propos d'un centre de cout</option>
                  <option value="compte">À propos d'un compte</option>
                  <option value="autres_sujets">Autres sujets</option>
                </select>
              </div>
              {showProjectInput && (
                <div className="form-group mb-3">
                  <input
                    name="bcc"
                    type="text"
                    className="form-control"
                    placeholder="Chercher une projet .."
                  />
                </div>
              )}
              {showSubProjectInput && (
                <div className="form-group mb-3">
                  <input
                    name="bcc"
                    type="text"
                    className="form-control"
                    placeholder="Chercher un sous projet .."
                  />
                </div>
              )}
              {showCostCenterInput && (
                <div className="form-group mb-3">
                  <input
                    name="bcc"
                    type="text"
                    className="form-control"
                    placeholder="Chercher un centre de cout .."
                  />
                </div>
              )}
              <div className="form-group mb-3">
                <input
                  name="Sujet"
                  type="text"
                  className="form-control"
                  placeholder="Sujet"
                />
              </div>
              
              <div className="form-group mb-3">
                <textarea
                  name="message"
                  id="email_message"
                  className="form-control"
                  placeholder="Message"
                  style={{ height: "120px" }}
                />
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={isUrgent}
                  onChange={handleUrgentToggle}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Envoyer comme important
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              <FontAwesomeIcon icon={faPaperPlane} style={iconStyle} />
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEnvoyerMessage;
