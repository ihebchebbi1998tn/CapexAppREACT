import React, { useState, useEffect } from "react";
import axios from "axios";
import "./demandes.css";

const TableauDemandes = () => {
  const [messages, setMessages] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/messages/list")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  const sortMessagesByDate = () => {
    const sortedMessages = [...messages];
    sortedMessages.sort((a, b) => {
      const dateA = new Date(parseDate(a.date_message));
      const dateB = new Date(parseDate(b.date_message));

      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setMessages(sortedMessages);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const parseDate = (dateString) => {
    const parts = dateString.split(" ");
    const datePart = parts[0];
    const timePart = parts[1] + " " + parts[2];

    const dateParts = datePart.split("/");
    const timeParts = timePart.split(":");
    const amPmPart = parts[3];

    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    if (amPmPart === "PM" && hours !== 12) {
      hours += 12;
    } else if (amPmPart === "AM" && hours === 12) {
      hours = 0;
    }

    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1;
    const day = parseInt(dateParts[1]);

    return new Date(year, month, day, hours, minutes);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMessages = messages.filter((message) =>
    message.expediteur_message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-lg-9 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">
            Boîte de réception des demandes
          </h5>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="text"
                className="form-control" // Adjust the column size (e.g., col-3)
                placeholder="🔍 Rechercher par expéditeur .. "
                style={{ width: "250px" }} // Adjust the width as needed
                onChange={handleSearch}
                value={searchQuery}
              />
              <button className="btn btn-link" onClick={sortMessagesByDate}>
                <img
                  src="/icons/SortIcon.png"
                  alt="Sort"
                  className="cursor-pointer"
                  style={{ width: "20px", height: "20px" }}
                />
                <img
                  src="/icons/Date.png"
                  alt="Date"
                  className="cursor-pointer"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
            <table className="table text-nowrap mb-0 align-middle">
              <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0"></th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Expéditeur</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Sujet</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Date</h6>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id_message}>
                    <td className="border-bottom-0">
                      <h6 className="fw-normal mb-1">
                        <img
                          src={
                            message.type_message === "important"
                              ? "/icons/DemandeImportant.png"
                              : "/icons/DemandeUrgente.png"
                          }
                          alt="DemandeImportant"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </h6>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-semibold">
                        {message.expediteur_message}
                      </p>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{message.sujet_message}</p>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{message.date_message}</p>
                    </td>
                    <td className="border-bottom-0 text-end">
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        <img
                          src="/icons/SeeDetails.png"
                          alt="Modify"
                          className="cursor-pointer"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <img
                          src="/icons/delete.png"
                          alt="Delete"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauDemandes;
