import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

const TableauDemandesSent = () => {
  const [messages, setMessages] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useUser(); // Access userData from UserContext

  const userEmail = userData.email;
  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get("http://127.0.0.1:8000/messages/list")
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    };
  
    // Fetch messages initially
    fetchMessages();
  
    // Poll for new messages every 3 seconds
    const intervalId = setInterval(fetchMessages, 3000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
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

  const handleDeleteMessage = (messageId) => {
    axios
      .delete(`http://127.0.0.1:8000/messages/delete/${messageId}`)
      .then((response) => {
        // Handle success (e.g., remove the message from the local state)
        console.log("Message deleted successfully:", response.data);

        // Update the local state by filtering out the deleted message
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id_message !== messageId)
        );
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting message:", error);
      });
  };

  // Filter messages where expediteur_message is "Iheb Chebbi"
  const filteredMessages = messages.filter(
    (message) => message.expediteur_message === userEmail
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
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Rechercher par expéditeur .. "
                style={{ width: "250px" }}
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
                  <th></th>
                  <th>
                    <h6 className="fw-semibold mb-0">Expéditeur</h6>
                  </th>
                  <th>
                    <h6 className="fw-semibold mb-0">Sujet</h6>
                  </th>
                  <th>
                    <h6 className="fw-semibold mb-0">Date</h6>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id_message}>
                    <td>
                      <h6>
                        <img
                          src={
                            message.type_message === "important"
                              ? "/icons/DemandeImportant.png"
                              : "/icons/DemandeUrgente.png"
                          }
                          alt="DemandeImportant"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </h6>
                    </td>
                    <td>
                      <p className="mb-0 fw-semibold">
                        {message.expediteur_message}
                      </p>
                    </td>
                    <td>
                      <p className="mb-0 fw-normal">{message.sujet_message}</p>
                    </td>
                    <td>
                      <p className="mb-0 fw-normal">{message.date_message}</p>
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        <img
                          src="/icons/SeeDetails.png"
                          alt="Modify"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <img
                          src="/icons/delete.png"
                          alt="Delete"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          onClick={() =>
                            handleDeleteMessage(message.id_message)
                          }
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

export default TableauDemandesSent;
