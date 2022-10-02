import React from "react";

const Layout = () => {
  return (
    <div className="h-[100vh] bg-red-300 w-[100%]">
      <div className="header w-[100%] h-[70px] bg-white shadow-lg flex flex-row justify-between items-center pl-5">
        <span className="text-3xl font-bungee text-primary">
          Coworking space
        </span>
        <div className="flex flex-row gap-4 justify-center items-center mr-10">
          <div className="text-base cursor-pointer hover:text-primary hover:border-b  border-primary">
            Request
          </div>
          <div className="text-base cursor-pointer hover:text-primary">
            Properties for rent
          </div>
          <div className="text-base cursor-pointer hover:text-primary">
            My reservation
          </div>
          <div className="text-base cursor-pointer hover:text-primary">
            Help
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
