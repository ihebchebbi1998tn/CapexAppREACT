import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./UsersPage.css";
import { UploadButton } from "@bytescale/upload-widget-react"; // Make sure this import is correct

const AddUsers = () => {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [groupeUtilisateur, setGroupeUtilisateur] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileNameSee, setfileNameSee] = useState("")
  const options = {
    apiKey: "public_kW15bpkGFXMQmVnAPZg19R1taFMb", // Use your public API key
    maxFileCount: 1,
  };

  const handleComplete = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((file) => ({
      fileUrl: file.fileUrl,
      fileName: extractImageName(file.fileUrl),
      fileId: file.fileName, // Add a unique fileId to each file
     
    }));
    setFiles([...files, ...newFiles]);
    setfileNameSee(newFiles[0]?.fileUrl || '');
    console.log(fileNameSee);

  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailPrefixChange = (e) => {
    const inputEmailPrefix = e.target.value.replace("@", "");
    setEmailPrefix(inputEmailPrefix);
  };

  useEffect(() => {
    fetchDepartments();
    fetchGroups();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/departements/get");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const extractImageName = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1].split(".")[0];
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/groupes/get");
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError("Veuillez remplir tous les champs.");
      return;
    }
  // Extract the file information
  const imageName = extractImageName(files[0].fileUrl);
  console.log(imageName);

    const user = {
      nom_utilisateur: nomUtilisateur,
      email_utilisateur: `${emailPrefix}@groupedelice.com.tn`,
      mot_de_passe: motDePasse,
      code_utilisateur: codeUtilisateur,
      role_utilisateur: selectedDepartment,
      groupe_utilisateur: groupeUtilisateur,
      type_utilisateur: typeUtilisateur,
      statut_utilisateur: "Activé",
      image_utilisateur: fileNameSee,
    };

    const isConfirmed = window.confirm(
      "Confirmez-vous l'ajout de cet utilisateur?"
    );

    if (isConfirmed) {
      try {
        const addResponse = await fetch("http://127.0.0.1:8000/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!addResponse.ok) {
          throw new Error("Erreur lors de la création de l'utilisateur.");
        }

        const responseData = await addResponse.json();

        if (responseData.message.level === "warning") {
          setError(
            "Utilisateur avec le même email_utilisateur existe déjà !"
          );
        } else {
          setSuccess(responseData.message.text);
        }
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de l'ajout de l'utilisateur."
        );
        console.error("Error during user creation:", error);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">
              Ajouter un Utilisateur
            </h5>

            {error && !error.includes("déjà existe") && (
              <div className="col-md-12 mt-2">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="col-md-12 mt-2">
                {success.includes("existe déjà") ? (
                  <div
                    className="alert alert-warning custom-warning"
                    role="alert"
                  >
                    {success}
                  </div>
                ) : (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}
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
                  <div className="password-input-container">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="motDePasse"
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                    />
                    <button
                      type="button"
                      className="eye-icon-btn"
                      onClick={handleTogglePassword}
                    >
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
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
                    {departments.map((department) => (
                      <option
                        key={department.id_departement}
                        value={department.nom_departement}
                      >
                        {department.nom_departement}
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
                    {groups.map((group) => (
                      <option key={group.id_groupe} value={group.nom_groupe}>
                        {group.nom_groupe}
                      </option>
                    ))}
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
              {/* Custom-styled button for file input */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="photoUtilisateur" className="form-label">
                    Photo Utilisateur
                  </label>
                  <UploadButton options={options} onComplete={handleComplete}>
                    {({ onClick }) => (
                      <div className="input-group" onClick={onClick}>
                        <span className="input-group-btn">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                          >
                            Parcourir
                          </button>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={fileNameSee}
                          readOnly
                        />
                      </div>
                    )}
                  </UploadButton>
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
