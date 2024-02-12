import React from "react";
import { useUser } from "../UserContext";
import { Link, useLocation } from "react-router-dom";
import { SideBarData } from "./SideBarData"; // Add this line

const SideBarItems = () => {
  const location = useLocation();
  const { userData } = useUser();

  const isAdmin = userData.type === "Admin";

  // Filter sidebar items based on user type
  const filteredSideBarData = isAdmin
    ? SideBarData // If admin, show all items
    : SideBarData.filter(item => ['Dashboard', 'Projets', 'Messages'].includes(item.title));

  return (
    <>
      {filteredSideBarData.map((val, key) => (
        <li
          className={location.pathname === val.link ? "sidebar-item selected" : "sidebar-item"}
          key={key}
        >
          <Link to={val.link} className="sidebar-link" aria-expanded="false">
            <span>{val.icon}</span>
            <span className="hide-menu">{val.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default SideBarItems;
