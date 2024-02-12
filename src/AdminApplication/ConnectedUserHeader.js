import { useUser,setUserData } from '../UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import React, { useEffect } from "react";
import { useSession,setSessionData } from "../SessionContext";

const ConnectedUserHeader = () => {
  const { userData } = useUser(); // Access userData from UserContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { updateUser } = useUser(); // Access the updateUser function from UserContext
  const {updateSession} = useSession();

  const userEmail = userData.email; // Updated to userData.email
  const userId = userData.id; // Updated to userData.id
  const userRole = userData.type; // Updated to userData.type
  const stayloged = userData.StayLogged; // Updated to userData.type
  const groupeUser = userData.groupe;
  const imgurl =  userData.image;
  const logout = () => {
    localStorage.removeItem("userData");
    updateUser("","","", ""); // Set user information
    updateSession("Vous avez été déconnecté avec succès ✓","")

    navigate("/");

  };

  useEffect(() => {
    // Check if any of the user data is empty, and if so, redirect to the home page
    if (!userEmail || !userId || !userRole) {
      navigate("/");
    }
  }, [userEmail, userId, userRole, navigate]);

  if (!userEmail || !userId || !userRole) {
    return null; // Return null to prevent rendering anything in this component
  }
  
  return (
    <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
      <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
      <div style={{ display: "flex", flexDirection: "column"}}>
    <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ margin: 0 }}>{userEmail}</p>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>{groupeUser}</p>
    </div>
</div>
<li className="nav-item dropdown">
          <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img src={imgurl} alt="" width="50" height="45" className="rounded-circle" />
          </a>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
            <div className="message-body">
              {userData.type === 'Admin' && ( // Check if the user is an Admin
                <a href="/dashboard/parametres" className="d-flex align-items-center gap-2 dropdown-item">
                  <i className="ti ti-user fs-6"></i>
                  <p className="mb-0 fs-3">Paramètres</p>
                </a>
              )}
              <button onClick={logout} className="btn btn-outline-primary mx-3 mt-2 d-block">Se déconnecter</button>
            </div>
          </div>
        </li>
        <li></li>
      </ul>
      
    </div>
  );
};

export default ConnectedUserHeader;
