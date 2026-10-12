import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useUserAuth } from "../../hooks/useUserAuth";

const DashboardLayout = ({ children, activeMenu }) => {
  useUserAuth();
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
