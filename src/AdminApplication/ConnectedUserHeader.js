import React from "react";

const ConnectedUserHeader = () => {
  return (
   
        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ margin: 0 }}>connectedUser.name</p>
              <p style={{ margin: 0, fontWeight: "bold" }}>connectedUser.role</p>
            </div>
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="../assets/images/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div className="message-body">
                  <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6"></i>
                    <p className="mb-0 fs-3">Parametres</p>
                  </a>
                  <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-mail fs-6"></i>
                    <p className="mb-0 fs-3">Mes e-mails</p>
                  </a>
                  <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-list-check fs-6"></i>
                    <p className="mb-0 fs-3">Mes demandes</p>
                  </a>
                  <a href="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      
  );
};

export default ConnectedUserHeader;
