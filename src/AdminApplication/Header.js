import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import ConnectedUserHeader from "./ConnectedUserHeader";
import "./Header.css";
import { useUser, setUserData } from "../UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSession, setSessionData } from "../SessionContext";
import axios from "axios";

const Header = () => {
  const { userData } = useUser();
  const { updateSession } = useSession();
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const { sessionData } = useSession();

  const stayLogged = userData.StayLogged;
  const userEmail= userData.email; // User's name

  const [enAttenteCount, setEnAttenteCount] = useState(0);

  const logout = () => {
    localStorage.removeItem("userData");
    updateUser("", "", "", "");
    updateSession("", "✘ Vous avez été déconnecté pour cause d'inactivité.");
    navigate("/");
  };

  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (stayLogged !== "Oui") {
      timeoutIdRef.current = setTimeout(() => {
        logout();
        window.location.href = "/";
      }, 15 * 60 * 1000);
    }

    const resetTimeout = () => {
      clearTimeout(timeoutIdRef.current);
      if (stayLogged !== "Oui") {
        timeoutIdRef.current = setTimeout(() => {
          logout();
          window.location.href = "/";
        }, 1 * 60 * 1000);
      }
    };

    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    // Create a function to fetch the "En attente" count
    const fetchEnAttenteCount = () => {
      axios
        .get("http://127.0.0.1:8000/messages/count-en-attente", {
          params: {
            statut_message: "En attente",
            recepteur_message: userEmail,
          },
        })
        .then((response) => {
          setEnAttenteCount(response.data.count);
        });
    };

    // Fetch the "En attente" count initially
    fetchEnAttenteCount();

    // Set up an interval to fetch the "En attente" count every 3 seconds
    const intervalEnAttenteCount = setInterval(fetchEnAttenteCount, 3000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalEnAttenteCount);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    };
  }, [stayLogged, userEmail]);

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a
              className="nav-link sidebartoggler nav-icon-hover"
              id="headerCollapse"
            >
              <i className="ti ti-menu-2"></i>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="/dashboard/demandes">
              <img src="/icons/Emails.png" width="20" alt="" />
              <strong className="email-count">{enAttenteCount}</strong>
              <div className="notification bg-warning rounded-circle"></div>
            </a>
          </li>
        </ul>

        <div className="topbar-divider d-none d-sm-block"></div>
        <ConnectedUserHeader />
        
      </nav>
    </header>
  );
};

export default Header;
