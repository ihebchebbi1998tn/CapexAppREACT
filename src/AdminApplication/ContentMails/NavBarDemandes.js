import React from "react";
import { useState } from "react";
import "./demandes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faInbox,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import ModalEnvoyerMessage from "./ModalEnvoyerMessage";

const iconStyle = {
  marginRight: "0.5rem", // Adjust the margin as needed
};

const NavBarDemandes = () => {
  const [ShowModalEnvoyerMessage, setShowModalEnvoyerMessage] =
    useState(false);

  return (
    <div className="col-md-3 d-flex">
      <div className="w-100">
        <div className="d-flex flex-column">
          <button
            className="btn btn-primary mb-2 text-left"
            onClick={() => setShowModalEnvoyerMessage(true)}
          >
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faPaperPlane} style={iconStyle} />
              <span>Envoyer un message</span>
            </div>
          </button>
          <button className="btn btn-secondary mb-2 text-left">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faInbox} style={iconStyle} />
              <span>Boîte de réception</span>
            </div>
          </button>
          <button className="btn btn-secondary text-left">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faFileImport} style={iconStyle} />
              <span>Messages envoyés</span>
            </div>
          </button>
        </div>
      </div>
      <ModalEnvoyerMessage
        showModal={ShowModalEnvoyerMessage}
        handleClose={() => setShowModalEnvoyerMessage(false)}
      />
    </div>
  );
};

export default NavBarDemandes;
