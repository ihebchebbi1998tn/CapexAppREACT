import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddUsers = () => {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [groupeUtilisateur, setGroupeUtilisateur] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add success state

  const handleEmailPrefixChange = (e) => {
    const inputEmailPrefix = e.target.value.replace("@", ""); // Remove "@" if entered
    setEmailPrefix(inputEmailPrefix);
  };

  const departments = [
    "Ressources humaines (RH)",
    "Finance",
    "Marketing",
    "Ventes",
    "Recherche et développement (R&D)",
    "Production",
    "Approvisionnement",
    "Service client",
    "Informatique",
    "Juridique",
    "Logistique",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setError(null);
    setSuccess(null);

    if (
      !nomUtilisateur ||
      !emailPrefix ||
      !motDePasse ||
      !codeUtilisateur ||
      !selectedDepartment ||
      !groupeUtilisateur ||
      !typeUtilisateur
    ) {
      setError("Please fill all fields.");
      return;
    }

    const user = {
      nom_utilisateur: nomUtilisateur,
      email_utilisateur: `${emailPrefix}@groupedelice.com.tn`,
      mot_de_passe: motDePasse,
      code_utilisateur: codeUtilisateur,
      role_utilisateur: selectedDepartment,
      groupe_utilisateur: groupeUtilisateur,
      type_utilisateur: typeUtilisateur,
    };

    try {
      // Check if the user already exists by email or code
      const response = await fetch(
        "http://127.0.0.1:8000/user/check-existence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_utilisateur: user.email_utilisateur,
            code_utilisateur: user.code_utilisateur,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          setError("L'utilisateur existe déjà.");
        } else {
          // User doesn't exist, proceed with adding the user
          const addResponse = await fetch("http://127.0.0.1:8000/user/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (addResponse.ok) {
            setSuccess("User added successfully.");
          } else {
            setError("Failed to add user.");
          }
        }
      } else {
        setError("An error occurred while checking user existence.");
      }
    } catch (error) {
      setError("An error occurred while adding the user.");
    }
  };
  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Ajouter unUtilisateurs</h5>


            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nomUtilisateur" className="form-label">
                    Nom Prenom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomUtilisateur"
                    value={nomUtilisateur}
                    onChange={(e) => setNomUtilisateur(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailUtilisateur" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="emailUtilisateur"
                      aria-describedby="emailHelp"
                      value={emailPrefix}
                      onChange={handleEmailPrefixChange}
                    />
                    <span className="input-group-text">
                      @groupedelice.com.tn
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="motDePasse" className="form-label">
                    Mot de Passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="motDePasse"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="codeUtilisateur" className="form-label">
                    Code Utilisateur
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="codeUtilisateur"
                    value={codeUtilisateur}
                    onChange={(e) => setCodeUtilisateur(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="roleUtilisateur" className="form-label">
                    Département
                  </label>
                  <select
                    className="form-control"
                    id="roleUtilisateur"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">Sélectionnez un département</option>
                    {departments.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="groupeUtilisateur" className="form-label">
                    Groupe Utilisateur
                  </label>
                  <select
                    className="form-control"
                    id="groupeUtilisateur"
                    value={groupeUtilisateur}
                    onChange={(e) => setGroupeUtilisateur(e.target.value)}
                  >
                    <option value="">Sélectionner un groupe</option>
                    <option value="CLC">CLC</option>
                    <option value="CLN">CLN</option>
                    <option value="CLSB">CLSB</option>
                    <option value="SBC">SBC</option>
                    <option value="CF">CF</option>
                    <option value="Delta Plastic">Delta Plastic</option>
                    <option value="STIAL">STIAL</option>
                    <option value="SOCOGES">SOCOGES</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="typeUtilisateur" className="form-label">
                    Type Utilisateur
                  </label>
                  <select
                    className="form-control"
                    id="typeUtilisateur"
                    value={typeUtilisateur}
                    onChange={(e) => setTypeUtilisateur(e.target.value)}
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="Admin">Admin</option>
                    <option value="Utilisateur">Utilisateur</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end">
                  <button type="submit" className="btn btn-outline-primary">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="me-1"
                      size="1"
                      style={{ color: "#5d87ff" }}
                    />
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
