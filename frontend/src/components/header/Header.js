import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const clickCoworkingSpace = () => {
    navigate("/");
  };
  const handleSignInOut = () => {
    if (!user.id) navigate("/login");
    localStorage.removeItem("token");
    setUser({
      id: "",
      customerName: "",
      email: "",
      phoneNumber: "",
      roleName: "",
      timeCreate: "",
      timeUpdate: "",
    });
    setShow(false);
  };
  return (
    <div className="relative header w-[100%] minH-[70px] h-[80px] bg-white shadow-lg flex flex-row justify-between items-center pl-5">
      <span
        className="text-3xl font-bungee text-primary cursor-pointer"
        onClick={() => clickCoworkingSpace()}
      >
        Coworking space
      </span>
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

        <div className="flex flex-row gap-2 relative">
          <FaRegUserCircle
            className="text-xl cursor-pointer"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          />

          <span className="text-primary font-medium">
            {user.id && user.customerName}
          </span>
        </div>
      </div>
      {show && (
        <div
          className="cursor-pointer px-3 py-3 w-[200px] absolute -bottom-8 right-10 translate- z-20 shadow-xl border-slate-200 border drop-shadow-2xl rounded-xl bg-white -translate-x-10 hover:bg-purple-100"
          onClick={handleSignInOut}
        >
          {user.id ? <span>Sign out</span> : <span>Sign in</span>}
        </div>
      )}
    </div>
  );
};

export default Header;
