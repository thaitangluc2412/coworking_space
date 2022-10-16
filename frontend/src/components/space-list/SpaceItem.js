import React from "react";

const SpaceItem = () => {
  return (
    <div className="w-[420px] h-[350px]">
      <div className="w-full h-[200px] relative">
        <img
          src="https://images.unsplash.com/photo-1665761125522-ef1be223a502?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="inline-block text-xs px-1 py-1 rounded-full text-grayText bg-white absolute top-1 right-1">
          Available from <span className="font-semibold"> 22 Jan 2023 </span>
        </div>
      </div>
      <div className="flex w-full h-[150px] flex-col px-1 py-1">
        <h3 className="type text-sm text-grayText mb-1">Private room</h3>
        <h1 className="name text-xl font-medium text-ellipsis line-clamp-2 overflow-hidden ">
          {" "}
          Spacious double bedroom with Balcony near Jonio metro station{" "}
        </h1>
        <p className="address text-sm font-light text-grayLigherText">
          Viale Jonio Roma, Italia{" "}
        </p>
        <div className="flex w-full justify-between text-primary mt-auto">
          <span className="text-2xl">
            600$<sub className="text-xs">/month</sub>
          </span>
          <button className="px-3 py-1 rounded-full bg-white shadow-xl button-animation">
            Rent now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceItem;
