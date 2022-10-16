import React from "react";

const Card = ({ header, desc }) => {
  return (
    <div className="w-[320px] h-[500px]  flex flex-col shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-[300px] mb-4">
        <img
          src="https://images.unsplash.com/photo-1664843984096-eae8be6cd10c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt="yo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-4 overflow-y-auto gap-3">
        <h1 className="font-medium text-lg">{header}</h1>
        <p className="text-sm text-gray">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
