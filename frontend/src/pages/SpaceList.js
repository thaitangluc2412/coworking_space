import React from "react";
import { NavLink } from "react-router-dom";
import SpaceItem from "../components/space-list/SpaceItem";

const SpaceList = () => {
  return (
    <div className="flex flex-row w-full min-h-full h-full pl-8">
      <div className="w-[60%] pt-10 overflow-y-auto scrollbar">
        <h1 className="text-2xl font-[500] mb-4">
          Are you looking for a space?
        </h1>
        <div className="flex gap-3 items-center">
          <NavLink to={"/"} className=" image-cover w-5 h-5 inline-block">
            <img
              src="/home.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </NavLink>
          <span className="text-2xl"> {">"} </span>
          <NavLink to={"/space-list"}>Listings</NavLink>
        </div>
        <div className="space-list grid grid-cols-2 gap-1 w-full gap-y-3">
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
        </div>
      </div>
      <div className="w-[40%] right-0 h-full shadow-lg"></div>
    </div>
  );
};

export default SpaceList;
