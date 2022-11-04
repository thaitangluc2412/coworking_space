import React from "react";
import { useNavigate } from "react-router";

const Card = ({ roomTypeName, description, url }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/space-list");
  };
  console.log("dataaaa");
  return (
    <div className="w-[320px] h-[500px]  flex flex-col shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-[300px] mb-4">
        <img src={url} className="w-full h-full object-cover" />
      </div>
      <div
        className="flex flex-col px-4 overflow-y-auto gap-3 cursor-pointer"
        onClick={handleClick}
      >
        <h1 className="font-medium text-lg">{roomTypeName}</h1>
        <p className="text-sm text-gray">{description}</p>
      </div>
    </div>
  );
};

export default Card;
