import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../UserContext";
import axios from "axios"; // Add axios for making API requests

const ModalEnvoyerMessage = ({ showModal, handleClose }) => {
  const [recepteurMessage, setRecepteurMessage] = useState("");
  const [selectedAbout, setSelectedAbout] = useState("");
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [showCostCenterInput, setShowCostCenterInput] = useState(false);
  const [showCompte, setShowCompte] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message
  const [nameProjet, setNameProjet] = useState([]);

  const [isUrgent, setIsUrgent] = useState(false);
  const { userData } = useUser(); // Access userData from UserContext

  const iconStyle = {
    marginRight: "0.5rem", // Adjust the margin as needed
  };

  const handleSelectChange = (e) => {
    setSelectedAbout(e.target.value);

    // Reset all input fields to not show by default
    setShowProjectInput(false);

    setShowCostCenterInput(false);
    setShowCompte(false);
    setShowOther(false);

    // Determine which input field to show based on the selected option
    if (e.target.value === "projet") {
      setShowProjectInput(true);
    } else if (e.target.value === "centre_de_cout") {
      setShowCostCenterInput(true);
    } else if (e.target.value === "compte") {
      setShowCompte(true);
    } else if (e.target.value === "autres_sujets") {
      setShowOther(true);
    }
  };

  const handleUrgentToggle = () => {
    setIsUrgent(!isUrgent);
  };

  const handleEnvoyerClick = async () => {
    if (
      !recepteurMessage ||
      !selectedAbout ||
      !document.getElementById("raison_message").value ||
      !document.getElementsByName("sujet_message")[0].value ||
      !document.getElementById("email_message").value
    ) {
      setAlertMessage("✘ Tous les champs doivent être remplis .");
      return;
    }

    const userEmail = userData?.email;
    const recepteur_message = recepteurMessage;
    const raison_message = document.getElementById("raison_message").value;
    const objet_message =
      document.getElementsByName("objet_message")[0].value || "";
    const sujet_message = document.getElementsByName("sujet_message")[0].value;
    const message_message = document.getElementById("email_message").value;
    const date_message = new Date().toLocaleString();
    const type_message = document.getElementById("flexSwitchCheckChecked")
      .checked
      ? "important"
      : "pas import";

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/messages/create",
        {
          expediteur_message: userEmail,
          recepteur_message,
          raison_message,
          objet_message,
          sujet_message,
          message_message,
          date_message,
          type_message,
          statut_message: "En attente",
        }
      );

      console.log("Message created successfully:", response.data);

      setRecepteurMessage("");
      setSelectedAbout("");
      setShowProjectInput(false);
      setShowCostCenterInput(false);
      setShowCompte(false);
      setShowOther(false);
      setIsUrgent(false);
      setAlertMessage(""); // Clear the alert message

      handleClose();
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/projets/list")
      .then((response) => {
        setNameProjet(response.data.map((item) => item.nom_projet));
      })
      .catch((error) => {
        console.error("Error fetching center codes:", error);
      });
  }, []);


  const handleProjectInput = (e) => {
    const input = e.target;
    const enteredValue = input.value;
  
    // Check if the entered value exists in the list of projects
    if (!nameProjet.includes(enteredValue)) {
      // Clear the input or provide feedback to the user
      setShowProjectInput("Entrer un nom valide");
    } else {
      // Reset the custom validity if the value is valid
      input.setCustomValidity("");
    }
  };
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-white">Envoyer un message</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {alertMessage && (
              <div className="alert alert-danger" role="alert">
                {alertMessage}
              </div>
            )}

            <form>
              <div className="form-group mb-3">
                <input
                  name="recepteur_message"
                  type="text"
                  className="form-control"
                  placeholder="À"
                  value={recepteurMessage}
                  onChange={(e) => setRecepteurMessage(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <select
                  className="form-control"
                  id="raison_message"
                  value={selectedAbout}
                  onChange={handleSelectChange}
                >
                  <option value="">Choisissez le sujet de votre message</option>
                  <option value="projet">À propos d'un projet</option>
                  <option value="sous_projet">À propos d'un sous-projet</option>
                  <option value="centre_de_cout">
                    À propos d'un centre de cout
                  </option>
                  <option value="compte">À propos de mon compte</option>
                  <option value="autres_sujets">Autres sujets</option>
                </select>
              </div>
              {showProjectInput && (
                <div className="form-group mb-3">
                  <input
                    name="objet_message"
                    type="text"
                    className="form-control"
                    placeholder="Chercher un projet .."
                    list="nameProjetList"
                    onInput={(e) => handleProjectInput(e)}
                  />
                  <datalist id="nameProjetList">
                    {nameProjet.map((code) => (
                      <option key={code} value={code} />
                    ))}
                  </datalist>
                </div>
              )}
              {showCostCenterInput && (
                <div className="form-group mb-3">
                  <input
                    name="objet_message"
                    type="text"
                    className="form-control"
                    placeholder="Chercher un centre de cout .."
                  />
                </div>
              )}
              {showCompte && (
                <div className="form-group mb-3">
                  <input
                    name="objet_message"
                    type="text"
                    className="form-control"
                    placeholder="De quoi avez-vous besoin ?"
                  />
                </div>
              )}
              {showOther && (
                <div className="form-group mb-3">
                  <input
                    name="objet_message"
                    type="text"
                    className="form-control"
                    placeholder="Quel est le but de la demande ?"
                  />
                </div>
              )}

              <div className="form-group mb-3">
                <input
                  name="sujet_message"
                  type="text"
                  className="form-control"
                  placeholder="Sujet"
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  name="message_message"
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEnvoyerClick}
            >
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
