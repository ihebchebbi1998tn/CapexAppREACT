import React from "react";
import { SideBarData } from "./SideBarData";
import { Link, useLocation } from "react-router-dom";

const SideBarItems = () => {
  const location = useLocation();

  return (
    <>
      {SideBarData.map((val, key) => (
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
