import React from "react";
import NavBar from "./NavBar/NavBar";
import Header from "./AdminApplication/Header";
import Content from "./AdminApplication/Content/ContentDashboard";
import { Route, Routes } from "react-router-dom";
import ContProjetUn from "./AdminApplication/ContentProjet/ContentProjet";
import UsersPage from "./AdminApplication/ContentUsers/ContentUserPage";
import AppFooter from "./AdminApplication/AppFooter";
import ContentSettings from "./AdminApplication/ContentSettings/ContentSettings";
import ContentMails from "./AdminApplication/ContentMails/ContentMails";
import ContentCapexSettings from "./AdminApplication/ContentCapexSettings/ContentCapexSettings";

function AdminRoutes() {
  return (
    <div className="App">
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <NavBar />
        <div className="body-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/projets" element={<ContProjetUn />} />
            <Route path="/utilisateurs" element={<UsersPage />} />
            <Route path="/demandes" element={<ContentMails />} />
            <Route path="/parametres" element={<ContentSettings />} />
            <Route path="/parametrecapex" element={<ContentCapexSettings />} />
          </Routes>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default AdminRoutes;
