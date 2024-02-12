import React, { useState, useEffect } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";
import axios from "axios";
import { useUser } from "../../UserContext";

const PieceJointe = ({ projectFichier }) => {
  const { userData } = useUser();
  const userType = userData.type;
  const [message, setMessage] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileNameSee, setfileNameSee] = useState("");
  const [showModal, setShowModal] = useState(false);

  const ApiKeyFromServer = "public_kW15bpkGFXMQmVnAPZg19R1taFMb";
  const options = {
    apiKey: ApiKeyFromServer,
    maxFileCount: 1,
  };

  const handleComplete = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((file) => ({
      fileUrl: file.fileUrl,
      fileName: extractImageName(file.fileUrl),
      fileId: file.fileName,
    }));
    setFiles([...files, ...newFiles]);
    setfileNameSee(newFiles[0]?.fileUrl || "");
  };

  const handleSaveButtonClick = () => {
    if (files.length === 0) {
      console.error("No files available");
      setMessage({
        text: "Aucun fichier disponible",
        level: "danger",
      });
      setTimeout(() => {
        setMessage(null);
      }, 6000);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/fichiers/create", {
        nom_fichier: fileNameSee,
        projet_fichier: projectFichier?.nom_projet,
      })
      .then((response) => {
        setMessage({
          text: "Fichier téléchargé avec succès ✔",
          level: "success",
        });
        setTimeout(() => {
          setMessage(null);
        }, 6000);
      })
      .catch((error) => {
        console.error("Error saving file information:", error);
      });
  };

  const handleDeleteButtonClick = (fileId) => {
    axios
      .delete(`http://127.0.0.1:8000/fichiers/delete/${fileId}`)
      .then((response) => {
        setFiles(files.filter((file) => file.fileId !== fileId));

        setMessage({
          text: "Fichier supprimé avec succès ✔",
          level: "success",
        });

        setTimeout(() => {
          setMessage(null);
        }, 6000);
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const extractImageName = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1].split(".")[0];
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/fichiers/get/${projectFichier?.nom_projet}`)
      .then((response) => {
        const fetchedFiles = response.data.map((file) => ({
          fileUrl: file.nom_fichier,
          fileName: file.nom_fichier,
          fileId: file.id,
        }));
        setFiles(fetchedFiles);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [projectFichier]);

  const openModal = (fileUrl) => {
    setfileNameSee(fileUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const downloadImage = () => {
    // Fetch the image as a blob
    fetch(fileNameSee)
      .then(response => response.blob())
      .then(blob => {
        // Create a blob URL for the image
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a hidden link and trigger a click to download the image
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `downloaded_image_${new Date().getTime()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Revoke the blob URL to free up resources
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error("Error fetching image:", error);
      });
  };
  
  return (
    <div className="card flex-grow-1">
      <div className="card-header">
        <strong>Pièces Jointes</strong>
      </div>

      {message && (
        <div className={`alert alert-${message.level}`}>{message.text}</div>
      )}

      <div className="card-body">
        <UploadButton options={options} onComplete={handleComplete}>
          {({ onClick }) => (
            <div>
              <a onClick={onClick} className="btn btn-success">
                <i className="ti ti-cloud-upload"></i> Choisissez un fichier
              </a>
            </div>
          )}
        </UploadButton>

        <div className="row">
          <div className="col-md-12">
            <div style={{ height: "15px" }}></div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <a
            className="btn btn-outline-primary m-1"
            onClick={handleSaveButtonClick}
          >
            <i className="ti ti-file-upload"></i> Enregistrer
          </a>
        </div>

        {files.length > 0 && (
          <div>
            <h6>Fichiers associés :</h6>
            <ul className="list-unstyled">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <button
                      className="btn btn-link"
                      onClick={() => openModal(file.fileUrl)}
                    >
                      voir fichier[{index + 1}]
                    </button>
                  </div>
                  {userType === "Admin" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteButtonClick(file.fileId)}
                    >
                      <i className="ti ti-trash"></i>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bootstrap Modal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-footer">

            <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  X
                </button>
                </div>

              <div className="modal-body">
                <img src={fileNameSee} alt="Selected" className="img-fluid" />
              </div>
              <div className="modal-footer">
               
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={downloadImage}
                  formTarget=""
                >
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Modal */}
      </div>
    </div>
  );
};

export default PieceJointe;
