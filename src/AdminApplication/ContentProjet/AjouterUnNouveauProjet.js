import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useUser } from "../../UserContext";

const AjouterUnNouveauProjet = () => {
  const [selectedExigence, setSelectedExigence] = useState("");
  const [selectedProductivite, setSelectedProductivite] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); // Initialize to current date
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); // Initialize to current date
  // for centres couts
  const [centerCodes, setCenterCodes] = useState([]);
  const [selectedCenterCode, setSelectedCenterCode] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { userData } = useUser();

  const userNom = userData.nom;

  const handleAnnulerClick = () => {
    window.location.reload(); // Refresh the page
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSelectedCenterCode(value);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/centres-cout/details/${value}`
      );
      const selectedCodeData = response.data;

      if (selectedCodeData) {
        setBudgetValue(selectedCodeData.total_centrecout);
      } else {
        setBudgetValue("");
      }
    } catch (error) {
      console.error("Error fetching center code details:", error);
    }
  };

  const today = new Date(); // Declare the 'today' variable here

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/centres-cout/list")
      .then((response) => {
        setCenterCodes(response.data.map((item) => item.code_centrecout));
      })
      .catch((error) => {
        console.error("Error fetching center codes:", error);
      });
  }, []);

  const createNewProjet = async () => {
    if (
      !selectedStartDate ||
      !selectedEndDate ||
      !selectedExigence ||
      !selectedProductivite ||
      !selectedPriority ||
      !selectedCategory ||
      !selectedNature
    ) {
      setMessage({
        text: "Veuillez remplir tous les champs ✘",
        level: "warning",
      });
      return;
    }

    const newProjet = {
      nom_projet: document.getElementById("NomDuProjet").value,
      exigence_projet: selectedExigence,
      productivite_projet: selectedProductivite,
      Priorite_projet: selectedPriority,
      categorie_projet: selectedCategory,
      nature_projet: selectedNature,
      debut_projet: selectedStartDate.toISOString().split("T")[0],
      fin_projet: selectedEndDate.toISOString().split("T")[0],
      pilot_projet: document.getElementById("PilotProjet").value,
      budget_projet: budgetValue,
      dreel_projet: " - ",
      freel_projet: " - ",
      fournisseur_projet: " - ",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/projets/create",
        newProjet
      );

      setMessage({
        text: "Projet créé avec succès ✔",
        level: "success",
      });

      console.log(response);
      // You can display a success message or navigate to another page here
    } catch (error) {
      setMessage({
        text: "Error creating project. Please try again.",
        level: "warning",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
              <div className="mb-3 mb-sm-0">
                <h5 className="card-title fw-semibold">Ajouter un projet</h5>
              </div>
            </div>
            {message && (
              <div className={`alert alert-${message.level}`}>
                {message.text}
              </div>
            )}
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="NomDuProjet" className="form-label">
                  Nom du projet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NomDuProjet"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="exigenceSelect" className="form-label">
                  Exigence réglementaire
                </label>
                <select
                  className="form-control"
                  id="exigenceSelect"
                  value={selectedExigence}
                  onChange={(e) => setSelectedExigence(e.target.value)}
                >
                  <option value="">Choisissez l'exigence réglementaire</option>
                  <option value="Normes sanitaires et hygiène alimentaire">
                    Normes sanitaires et hygiène alimentaire
                  </option>
                  <option value="Étiquetage des produits">
                  Étiquetage des produits
                  </option>
                  <option value="Certification ISO">
                  Certification ISO
                  </option>
                  <option value="Sécurité des employés">
                  Sécurité des employés
                  </option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="productiviteSelect" className="form-label">
                  Choisissez la productivité
                </label>
                <select
                  className="form-control"
                  id="productiviteSelect"
                  value={selectedProductivite}
                  onChange={(e) => setSelectedProductivite(e.target.value)}
                >
                  <option value="">Choisissez le niveau de productivité</option>
                  <option value="0%">0%</option>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                </select>
              </div>
            </div>

            {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="prioritySelect" className="form-label">
                  Priorité
                </label>
                <select
                  className="form-control"
                  id="prioritySelect"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="">Choisissez la priorité du projet</option>
                  <option value="Élevée">Élevée</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="faible">faible</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="categorySelect" className="form-label">
                  Catégorie du projet
                </label>
                <select
                  className="form-control"
                  id="categorySelect"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Choisissez la catégorie de projet</option>
                  <option value="Développement de Produit Nouveau">
                    Développement de Produit Nouveau
                  </option>
                  <option value="Achat">
                   Achat 
                  </option>
                  <option value="Rénovation">
                  Rénovation  
                  </option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="natureSelect" className="form-label">
                  Nature du projet
                </label>
                <select
                  className="form-control"
                  id="natureSelect"
                  value={selectedNature}
                  onChange={(e) => setSelectedNature(e.target.value)}
                >
                  <option value="">Choisissez la nature du projet</option>
                  <option value="Projets Informatiques">
                    Projets Informatiques
                  </option>
                  <option value="Projets Alimentaire">
                    Projets Alimentaire
                  </option>
                  <option value="A but non lucratif">
                  A but non lucratif
                  </option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="DateDebutPrevue" className="form-label">
                  Date début prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    minDate={today} // Set the minimum date to today
                    className="form-control"
                    id="DateDebutPrevue"
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        enabled: true,
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: "viewport",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="DateFinPrévue" className="form-label">
                  Date fin prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    minDate={selectedStartDate} // Set the minimum date to the selected start date
                    className="form-control"
                    id="DateFinPrévue"
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        enabled: true,
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: "viewport",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="PilotProjet" className="form-label">
                  Pilote du projet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PilotProjet"
                  value={userNom}
                  readOnly
                  style={{ color: "gray" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Code centre de coûts
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  list="centerCodesList"
                  onChange={handleInputChange}
                />
                <datalist id="centerCodesList">
                  {centerCodes.map((code) => (
                    <option key={code} value={code} />
                  ))}
                </datalist>
              </div>
              <div className="col-md-8">
                <div className="col-md-4">
                  <label className="form-label">Budget total:</label>
                  <span> {budgetValue} TND</span>
                </div>
              </div>
            </div>

            {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger mr-5" // Add margin to the right
                  onClick={handleAnnulerClick}
                >
                 ✘ 
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-5" // Add margin to the left
                  onClick={createNewProjet}
                >
                ✔ Confirmer 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterUnNouveauProjet;
