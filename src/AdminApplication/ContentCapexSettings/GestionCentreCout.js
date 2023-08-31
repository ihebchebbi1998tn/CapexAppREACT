import React, { useState, useEffect } from "react";
import ModalAjouterCentreCout from "./ModalAjouterCentreCout";
import ModalCentreCoutDetails from "./ModalCentreCoutDetails";

const GestionCentreCout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedCentreCout, setSelectedCentreCout] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [DeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/centres-cout/list");
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/centres-cout/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchData();
        setDeleteAlertVisible(true);
        setTimeout(() => {
          setDeleteAlertVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const toggleDropdown = (index) => {
    // Your existing toggleDropdown logic here
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDisplayDetails = (event, index) => {
    setSelectedCentreCout(tableData[index]);
    setShowDetailsModal(true);
  };

  const handleUpdate = (id, updatedData) => {
    const updatedTableData = tableData.map((item) =>
      item.id_centrecout === id ? { ...item, ...updatedData } : item
    );

    setTableData(updatedTableData);
  };

  const filteredTableData = tableData.filter((item) =>
    item.code_centrecout.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-md-4 d-flex">
      <div className="card flex-grow-1">
        <div
          className="card-header"
          style={{ display: "grid", placeItems: "center" }}
        >
          <strong>Centres de coûts</strong>
        </div>

        <div
          className="card-body"
          style={{ maxHeight: "300px", overflowY: "scroll" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              className="form-control me-3"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div
            id="success-alert"
            className={`alert alert-warning ${
              DeleteAlertVisible ? "d-block" : "d-none"
            } mt-3`}
          >
            Centre de cout supprimé avec succès!
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>
                  <img
                    src="/icons/add.png"
                    alt="Add"
                    className="cursor-pointer  float-end"
                    style={{ width: "20px", height: "20px" }}
                    onClick={openModal}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.code_centrecout}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ position: "relative" }}>
                      <img
                        src="/icons/SeeDetails.png"
                        alt="Details"
                        className="cursor-pointer"
                        style={{ width: "30px", height: "30px" }}
                        onClick={(event) => handleDisplayDetails(event, index)}
                      />
                      <img
                        src="/icons/delete.png"
                        alt="Delete"
                        className="cursor-pointer"
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleDelete(item.id_centrecout)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAjouterCentreCout
        showModal={showModal}
        handleClose={closeModal}
        tableData={tableData}
      />
      <ModalCentreCoutDetails
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        selectedCentreCout={selectedCentreCout}
        onUpdate={(id, updatedData) => {
          // Update the selectedCentreCout in the parent component
          setSelectedCentreCout({ ...selectedCentreCout, ...updatedData });
        }}
      />
    </div>
  );
};

export default GestionCentreCout;
