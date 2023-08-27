import React from "react";
import ConnectedUserHeader from "./ConnectedUserHeader";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a
              className="nav-link sidebartoggler nav-icon-hover"
              id="headerCollapse"
              href="javascript:void(0)"
            >
              <i className="ti ti-menu-2"></i>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="/DashboardAdmin/demandes">
            <img src="/icons/Demandes.png" width="20" alt="" />
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
