import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // Import Axios or your preferred HTTP client

const AjouterUnNouveauProjet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExigence, setSelectedExigence] = useState("");
  const [selectedProductivite, setSelectedProductivite] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // for centres couts
  const [centerCodes, setCenterCodes] = useState([]);
  const [selectedCenterCode, setSelectedCenterCode] = useState("");
  const [budgetValue, setBudgetValue] = useState("");

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
      const selectedCodeData = response.data; // Assuming the response provides all the details including total_centrecout
      console.log("API response:", response.data); // Check the response data

      if (selectedCodeData) {
        setBudgetValue(selectedCodeData.total_centrecout);
      } else {
        setBudgetValue("");
      }
    } catch (error) {
      console.error("Error fetching center code details:", error);
    }
  };

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

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
              <div className="mb-3 mb-sm-0">
                <h5 className="card-title fw-semibold">Première étape</h5>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nom du projet
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
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
                  <option value="exigence1">
                    Normes sanitaires et hygiène alimentair
                  </option>
                  <option value="exigence2">Certification HACCP</option>
                  <option value="exigence2">Autorisations et permis</option>
                  <option value="exigence2">Étiquetage des produits</option>
                  <option value="exigence2">Contrôle des contaminants</option>
                  <option value="exigence2">Stockage et distribution</option>
                  <option value="exigence2">Traçabilité</option>
                  <option value="exigence2">Contrôles de qualité </option>
                  <option value="exigence2">Sécurité des employés</option>
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
                  <option value="exigence1">0%</option>
                  <option value="exigence2">-5%</option>
                  <option value="exigence2">+5%</option>
                  <option value="exigence2">+10%</option>
                  <option value="exigence2">-10%</option>
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
                  <option value="exigence1">Élevée</option>
                  <option value="exigence2">Moyenne</option>
                  <option value="exigence2">Basse</option>
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
                  <option value="Développement de Produit Nouveau">Développement de Produit Nouveau</option>
    <option value="Réorganisation des Processus">Réorganisation des Processus</option>
    <option value="Expansion Géographique">Expansion Géographique</option>
    <option value="Mise en Place d'un Système Informatique">Mise en Place d'un Système Informatique</option>
    <option value="Campagne de Lancement">Campagne de Lancement</option>
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
                  <option value="Projets de Construction">
                    Projets de Construction
                  </option>
                  <option value="Projets de Recherche et Développement">
                    Projets de Recherche et Développement
                  </option>
                  <option value="Projets Marketing et Publicité">
                    Projets Marketing et Publicité
                  </option>
                  <option value="Projets d'Amélioration Continue">
                    Projets d'Amélioration Continue
                  </option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Date début prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    id="exampleInputPassword1"
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Date fin prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    id="exampleInputPassword1"
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
                <label htmlFor="exampleInputUsername1" className="form-label">
                  Pilote du projet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
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
                <label htmlFor="chooseFile" className="form-label">
                  Pièces jointes
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="chooseFile"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <label className="form-label">Budget total:</label>
                <span> {budgetValue} TND</span>
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
                <button type="submit" className="btn btn-primary ">
                  SUIVANT
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
