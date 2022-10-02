import React from "react";

const Header = () => {
  return (
    <div className="header w-[100%] minH-[70px] h-[70px] bg-white shadow-lg flex flex-row justify-between items-center pl-5">
      <span className="text-3xl font-bungee text-primary">Coworking space</span>
      <div className="flex flex-row gap-4 justify-center items-center mr-10">
        <div className="text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary">
          Request
        </div>
        <div className="text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary">
          Properties for rent
        </div>
        <div className="text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary">
          My reservation
        </div>
        <div className="text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary">
          Help
        </div>
      </div>
    </div>
  );
};

export default Header;
