import React, { useState, useEffect } from "react";
import SideBarItems from "./SideBarItems";
import { useUser } from "../UserContext";
import Carousel  from "./Carousel";
const NavBar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isNewMessage, setIsNewMessage] = useState(false); // State to track new messages
  const [latestMessage, setLatestMessage] = useState(""); // State to store the latest message
  const { userData } = useUser(); // Access userData from UserContext


  const userNom = userData.nom; // Updated to userData.email
 const userEmail = userData.email;

  useEffect(() => {
    // Function to check for new messages
    const checkForNewMessages = async () => {
      try {
        // Make an API request to check for new messages
        const response = await fetch("http://127.0.0.1:8000/messages/list");
        const data = await response.json();

        // Assuming data is an array of messages
        const currentTime = new Date();
        const oneMinuteAgo = new Date(currentTime - 60 * 1000); // Calculate 1 minute ago

        // Filter messages sent within the last minute
        const newMessages = data.filter((message) => {
          const messageTime = new Date(message.date_message);
          return messageTime >= oneMinuteAgo && messageTime <= currentTime;
        });

        if (newMessages.length > 0) {
          const latest = newMessages[newMessages.length - 1]; // Get the latest new message
         
          
          if (
            userEmail !== latest.expediteur_message &&
            latest.sujet_message && (userEmail === latest.recepteur_message)
          ) {
            const messageTime = formatMessageTime(latest.date_message);
            const messageText = `${latest.expediteur_message}: ${
              latest.sujet_message
            } (${messageTime})`;

            // Check if this is a new message (not previously shown)
            if (messageText !== latestMessage) {
              setLatestMessage(messageText); // Update the latest message
              setIsNewMessage(true); // Set isNewMessage to true
            }
          }
        }
      } catch (error) {
        console.error("Error checking for new messages:", error);
      }
    };

    // Poll for new messages every 30 seconds (adjust the interval as needed)
    const intervalId = setInterval(() => {
      checkForNewMessages();
    }, 3000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [latestMessage, userNom]); // Add userNom to the dependency array to recheck when it changes

  useEffect(() => {
    // Show the notification when a new message is detected
    if (isNewMessage) {
      setShowNotification(true);

      // Hide the notification after 3 seconds (adjust as needed)
      setTimeout(() => {
        setShowNotification(false);
        setIsNewMessage(false); // Reset isNewMessage after showing the notification
      }, 7000);
    }
  }, [isNewMessage]);

  const formatMessageTime = (isoTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const messageTime = new Date(isoTimeString).toLocaleString(undefined, options);
    return messageTime;
  };

  return (
    <aside className="left-sidebar">
      <div>
        {/* Espacement entre les éléments */}
        <div className="row">
              <div className="col-md-12">
                <div style={{ height: "10px" }}></div>
              </div>
            </div>
        <div className="brand-logo d-flex align-items-center justify-content-center">
          <img src="/assets/logocapex.png" width="130" alt="" />
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
         <div className="brand-logo d-flex align-items-center justify-content-center">
         <img src="/assets/delicegroupe.png" width="220" height="50" alt="" /> 
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            </li>
            <SideBarItems />
            <Carousel /> 
          </ul>
          
          <div>
            {showNotification && (
              <div
                className="alert alert-success"
                role="alert"
                style={{
                  position: "fixed",
                  bottom: "20px",
                  left: "20px",
                  right: "20px", // Adjust as needed
                  width: "400px", // Set the width as needed
                  height: "60px", // Set the height as needed
                  zIndex: 9999, // Ensure it's on top of other elements
                }}
              >
                📨 {latestMessage}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default NavBar;
