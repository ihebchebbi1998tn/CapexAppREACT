import React, { useState } from "react";
import "./News.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const News = () => {
  const monthsData = [
    { number: 2, name: "Janvier", eventname: "Journée portes ouvertes", eventdescri: "Présenter l'installation de production aux parties prenantes, aux clients et au public." },
    { number: 8, name: "Janvier", eventname: "Ateliers de contrôle qualité", eventdescri: "Identifier les domaines clés d'amélioration de la qualité et mettre en œuvre des changements dans les machines." },
    { number: 1, name: "Février", eventname: "Atelier d'adoption de la technologie", eventdescri: "Présentation et formation des collaborateurs sur l'utilisation de la nouvelle application CAPEX." },
    // Add other months as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : monthsData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < monthsData.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="news-container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3 className="mb-3">Évènements</h3>
            {monthsData.length > 1 && (
              <div className="d-flex">
              <a href="#" onClick={handlePrev} className="clickable-icon">
                <img src="/icons/left-arrow.png" alt="Previous" />
              </a>
              <a href="#" onClick={handleNext} className="clickable-icon">
                <img src="/icons/right-arrow.png" alt="Next" />
              </a>
            </div>
            )}
          </div>
          <div className="col-12">
            <div className="row card-container">
              {monthsData.map((month, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className={`card ${idx === currentIndex ? "active" : ""}`}>
                    <div className="card-img-top text-center bg-dark p-3">
                      <h1 className="display-4 text-light">{month.number}</h1>
                      <p className="lead text-light">{month.name}</p>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{month.eventname}</h4>
                      <p className="card-text">{month.eventdescri}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default News;
