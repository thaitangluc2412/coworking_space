import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const LayoutMange = () => {
  return (
    <div className="w-full h-[100vh] flex">
      <Sidebar></Sidebar>
      <div className="w-full h-full overflow-y-auto px-6 pt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutMange;
