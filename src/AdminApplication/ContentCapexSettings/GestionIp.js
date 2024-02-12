import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

const API_BASE_URL = "http://127.0.0.1:8000/ips";

const GestionIp = ({ showModal, handleClose }) => {
  const [ipInput, setIpInput] = useState("");
  const [ipList, setIpList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUser(); // Access userData from UserContext
  const userPassword = userData?.pass;

  useEffect(() => {
    // Fetch IP list from the API when the component mounts
    const fetchIPList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/list`);
        console.log("IP List Response:", response.data); // Log the response data
        setIpList(response.data);
      } catch (error) {
        console.error("Error fetching IP list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIPList();
  }, []);

  const addIp = async () => {
    const enteredPassword = prompt("Veuillez entrer votre mot de passe :");

    if (enteredPassword === userPassword) {
      if (isValidIP(ipInput)) {
        const ipExists = ipList.some((item) => item.address_ip === ipInput);

        if (!ipExists) {
          try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/create`, {
              address_ip: ipInput,
            });

            if (response.data && response.data.ip) {
              setIpList([...ipList, response.data.ip]);
              setIpInput("");
            } else {
              console.error("Unexpected API response:", response.data);
            }
          } catch (error) {
            console.error("Error adding IP:", error);
          } finally {
            setLoading(false);
          }
        } else {
          alert("L'adresse IP existe déjà dans la base de données.");
        }
      } else {
        alert("Adresse IP invalide. Veuillez entrer une adresse IP valide.");
      }
    } else {
      alert("Mot de passe incorrect. Impossible d'ajouter une adresse IP.");
    }
  };

  const isValidIP = (ip) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip);
  };

  const deleteIp = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      const updatedList = ipList.filter((item) => item.id !== id);
      setIpList(updatedList);
    } catch (error) {
      console.error("Error deleting IP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content content-settings">
          {/* Input field and button */}
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez une adresse IP"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={addIp}
                  disabled={loading}
                >
                  {loading ? "Actualisation..." : "Ajouter"}
                </button>
              </div>
            </div>

            {/* Bootstrap table */}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Adresse IP</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ipList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.address_ip}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteIp(item.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer content-settings">
            <button
              type="button"
              className="btn btn-secondary content-settings"
              data-dismiss="modal"
              onClick={handleClose}
            >
              ✘
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionIp;
