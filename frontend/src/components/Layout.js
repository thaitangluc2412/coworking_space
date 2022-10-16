import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Layout = () => {
  return (
    <div className="min-h-[100vh] h-[100vh] bg-red-300 w-[100%] flex flex-col">
      <Header></Header>
      <div className="w-[100%] h-[100%] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
