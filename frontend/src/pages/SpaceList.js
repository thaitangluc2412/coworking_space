import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Map from "../components/map/Map";
import SpaceItem from "../components/space-list/SpaceItem";
import http from "../config/axiosConfig";

const SpaceList = () => {
  // const locations = require("../components/map/locations.json");
  const { id } = useParams();
  const [listSpace, setListSpace] = useState([]);
  useEffect(() => {
    http
      .get(`/rooms/roomType/${id}`)
      .then((response) => setListSpace(response.data))
      .catch((e) => console.log(e));
  }, []);
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
          {listSpace.length > 0 &&
            listSpace.map((space) => (
              <SpaceItem
                key={space.id}
                url={space.images[0].url}
                address={`${space.address}, ${space.city}`}
                roomName={space.roomName}
                roomTypeName={space.roomTypeName}
                dayPrice={space.dayPrice}
                id={space.id}
                typeRoomId={space.typeRoomId}
              />
            ))}
        </div>
      </div>
      <div className="w-[40%] right-0 h-full shadow-lg">
        {/* <Map locations={locations} /> */}
      </div>
    </div>
  );
};

export default SpaceList;
