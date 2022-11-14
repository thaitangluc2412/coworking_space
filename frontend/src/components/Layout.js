import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
const Layout = () => {
  return (
    <div className="min-h-[100vh] h-[100vh] w-[100%] flex flex-col">
      <Header></Header>
      <div className="w-[100%] h-[100%] overflow-y-auto">
        <Outlet />
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
