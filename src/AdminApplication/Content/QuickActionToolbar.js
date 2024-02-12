import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./QuickActionToolbar.css"; // Adjust the import path based on your project structure

const QuickActionToolbar = () => {
  const { userData } = useUser();
  const isAdmin = userData.type === "Admin";

  const buttons = [
    {
      title: "Créer un projet",
      icon: faFile,
      link: "/dashboard/projets",
    },
    {
      title: "Envoyer un message",
      icon: faPaperPlane,
      link: "/dashboard/demandes",
    },
  ];

  if (isAdmin) {
    buttons.unshift(
      {
        title: "Ajouter un utilisateur",
        icon: faUser,
        link: "/dashboard/utilisateurs",
      },
      {
        title: "Paramètres",
        icon: faGear,
        link: "/dashboard/parametrecapex",
      }
    );
  }

  const buttonClass = isAdmin ? "col-sm-6 col-md-3" : "col-md-6";

  return (
    <div className="row quick-action-toolbar">
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-header d-block d-md-flex">
            <h5 className="mb-0">Actions rapides</h5>
          </div>
          <div
            className={`${
              isAdmin ? "d-md-flex" : "text-center"
            } row m-0 quick-action-btns`}
            role="group"
            aria-label="Quick action buttons"
          >
            {buttons.map((button, index) => (
              <div
                key={index}
                className={`p-3 text-center btn-wrapper ${buttonClass}`}
              >
                <Link to={button.link}>
                  <button type="button" className="btn px-0">
                    <FontAwesomeIcon icon={button.icon} className="mr-2" />{" "}
                    {button.title}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionToolbar;
