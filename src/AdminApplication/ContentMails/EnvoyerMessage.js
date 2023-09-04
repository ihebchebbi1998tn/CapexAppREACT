import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const EnvoyerMessage = () => {
  const [subject, setSubject] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false); // State for the urgency switch

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the email
    console.log("Subject:", subject);
    console.log("Object:", object);
    console.log("Message:", message);
    console.log("Urgent:", isUrgent ? "Urgent" : "Not Urgent");
    // You can use Axios or your preferred HTTP client to send the email here
  };

  return (
    <div className="row">
      <div className="col-lg-9 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-3">
              <div className="mb-3 mb-sm-0">
                <h5 className="card-title fw-semibold">Sending Email</h5>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="recipient" className="form-label">
                  To
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="urgentCheckbox"
                  checked={isUrgent}
                  onChange={() => setIsUrgent(!isUrgent)}
                />
                <label className="form-check-label" htmlFor="urgentCheckbox">
                  Urgent
                </label>
              </div>

              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    SEND
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

export default EnvoyerMessage;
