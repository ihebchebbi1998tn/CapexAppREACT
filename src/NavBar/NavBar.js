import React from "react";
import SideBarItems from "./SideBarItems";
import Disconnect from "./Disconnect";

const NavBar = () => {
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-center">
            <img src="/assets/logo.png" width="140" alt="" />

          <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
        <div className="brand-logo d-flex align-items-center justify-content-center">
            <img src="/assets/delicegroupe.png" width="220" alt="" />
          
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            </li>
            <SideBarItems />
          </ul>
          <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
            <Disconnect />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default NavBar;
