import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../header/Header";
const LayoutMange = () => {
  return (
    <div className="w-full max-h-[100vh] h-[100vh] grid">
      <Header></Header>
      <div className="w-full h-[calc(100vh_-_80px)] flex flex-row">
        <Sidebar></Sidebar>
        <div className="w-full overflow-y-auto px-6 pt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutMange;
