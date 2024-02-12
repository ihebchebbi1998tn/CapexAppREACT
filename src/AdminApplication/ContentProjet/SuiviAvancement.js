import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAjouterPhase from "./ModalAjouterPhase";
import ModalSuiviAvancement from "./ModalSuiviAvancement";
import { useUser } from "../../UserContext";

const SuiviAvancement = ({ projectNom }) => {
  const [showModalAjouterPhase, setShowModalAjouterPhase] = useState(false);
  const [showModalSuiviAvancement, setShowModalSuiviAvancement] = useState(false);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const nom_projet = projectNom.nom_projet;
  const debut_projet = projectNom.debut_projet;
  const fin_projet = projectNom.fin_projet;
  const { userData } = useUser();
  const userPassword = userData.pass;
  const userType = userData.type;

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("fr-CA");
    return formattedDate;
  };

  const calculateDaysDifference = (date1, date2) => {
    if (!date1 || !date2) return null;
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const fetchPhasesByProject = (projectName) => {
    axios
      .get(`http://127.0.0.1:8000/phases/get/${projectName}`)
      .then((response) => {
        setPhases(response.data);
        setLoading(false);
      });
  };

  const deletePhase = (phaseId) => {
    if (userType === 'Admin') {
      const confirmDelete = window.confirm('Veuillez entrer votre mot de passe pour supprimer cette phase.');
      if (confirmDelete) {
        const enteredPassword = prompt('Tapez votre mot de passe:');
        if (enteredPassword === userPassword) {
          axios
            .delete(`http://127.0.0.1:8000/phases/delete/${phaseId}`)
            .then((response) => {
              if (response.status === 200) {
                fetchPhasesByProject(nom_projet);
                setMessage({
                  text: "Phase supprimée ✔",
                  level: "success",
                });
              } else {
                setMessage({
                  text: "La suppression de la phase a échoué. ✘",
                  level: "danger",
                });
              }
            })
            .catch((error) => {
              setMessage({
                text: "La suppression de la phase a échoué. ✘",
                level: "danger",
              });
            });
        } else {
          setMessage({
            text: "Le mot de passe ne correspond pas. La phase n'a pas été supprimée. ✘",
            level: "danger",
          });
        }
      }
    } else {
      setMessage({
        text: "Vous n'avez pas les autorisations nécessaires pour supprimer des phases.",
        level: "danger",
      });
    }
  };

  const findDates = () => {
    let earliestDate = null;
    let clotureDate = null;

    phases.forEach((phase) => {
      const startDate = new Date(phase.debut_phase);

      if (!earliestDate || startDate < earliestDate) {
        earliestDate = startDate;
      }

      if (phase.nom_phase === "Clôture du projet") {
        clotureDate = new Date(phase.fin_phase);
      }
    });

    return { earliestDate, clotureDate };
  };

  const { earliestDate, clotureDate } = findDates();

  const daysDifferenceDebut = calculateDaysDifference(debut_projet, earliestDate);
  const daysDifferenceFin = calculateDaysDifference(fin_projet, clotureDate);

  const getTextColorStyle = (daysDifference) => {
    if (daysDifference === null) {
      return "";
    } else if (daysDifference > 0) {
      return "text-danger";
    } else if (daysDifference === 0) {
      return "text-success";
    } else {
      return "text-success";
    }
  };

  const isLastPhaseCloture = phases.length > 0 && phases[phases.length - 1].nom_phase === "Clôture du projet";

  useEffect(() => {
    fetchPhasesByProject(nom_projet);

    const intervalId = setInterval(() => {
      fetchPhasesByProject(nom_projet);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [nom_projet]);

  return (
    <div className="col-md-4 d-flex">
      <div className="card flex-grow-1">
        <div className="card-header">
          <strong>Suivie  d'avancement</strong>
        </div>
        {message && (
          <div className={`alert alert-${message.level}`}>
            {message.text}
          </div>
        )}
        <div className="card-body">
          <div className="card-text">
            <p className="card-title">Date début réel:</p>
            <p>
              <strong>{earliestDate ? formatDate(earliestDate) : "-"}</strong>
              {daysDifferenceDebut !== null && (
                <span className={getTextColorStyle(daysDifferenceDebut)}>
                  {" "}
                  ({daysDifferenceDebut} jour(s) de retard)
                </span>
              )}
            </p>
          </div>
          {clotureDate && (
            <div className="card-text">
              <p className="card-title">Date de clôture réel:</p>
              <p>
                <strong>{formatDate(clotureDate)}</strong>
                {daysDifferenceFin !== null && (
                  <span className={getTextColorStyle(daysDifferenceFin)}>
                    {" "}
                    ({daysDifferenceFin} jour(s) de retard)
                  </span>
                )}
              </p>
            </div>
          )}

          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {loading ? (
              <p>Chargement des phases...</p>
            ) : (
              phases.map((phase, index) => (
                <div className="card mb-2" key={phase.id}>
                  <div className="card-body">
                    <h5 className="card-title">Phase: {phase.nom_phase}</h5>
                    <p className="card-text">Date début: {formatDate(phase.debut_phase)}</p>
                    {phase.nom_phase === "Clôture du projet" && (
                      <p className="card-text">Date fin: {formatDate(phase.fin_phase)}</p>
                    )}
                    {userType === "Admin" && (
                      <a
                        href="#"
                        className="card-link"
                        onClick={() => deletePhase(phase.id)}
                      >
                        <i className="ti ti-trash"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {!isLastPhaseCloture && (
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-outline-primary m-1"
                onClick={() => setShowModalAjouterPhase(true)}
              >
                <i className="ti ti-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <ModalAjouterPhase
        showModal={showModalAjouterPhase}
        handleClose={() => setShowModalAjouterPhase(false)}
        Projetnom={projectNom}
      />
      <ModalSuiviAvancement
        showModal={showModalSuiviAvancement}
        handleClose={() => setShowModalSuiviAvancement(false)}
      />
    </div>
  );
};

export default SuiviAvancement;
