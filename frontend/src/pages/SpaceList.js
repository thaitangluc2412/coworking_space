import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

import SpaceItem from "../components/space-list/SpaceItem";
import http from "../config/axiosConfig";

const SpaceList = () => {
  // const { id } = useParams();
  const [params] = useSearchParams();
  const cityName = params.get("cityName");
  const typeRoomId = params.get("typeRoomId");
  const provinceId = params.get("provinceId");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");

  const [listSpace, setListSpace] = useState([]);
  const filter = (cityName, typeRoomId) => {
    let filterList = "rooms/roomFilter";
    const urlString = [];
    if (cityName) {
      cityName = cityName.replaceAll(" ", "_");
      urlString.push(`cityName=${cityName}`);
    }
    if (typeRoomId) {
      urlString.push(`typeRoomId=${typeRoomId}`);
    }
    if (provinceId) {
      urlString.push(`provinceId=${provinceId}`);
    }
    if (minPrice) {
      urlString.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      urlString.push(`maxPrice=${maxPrice}`);
    }

    if (urlString.length !== 0) {
      filterList = filterList.concat(`?${urlString.join("&")}`);
    }
    return filterList;
  };
  useEffect(() => {
    http
      .get(filter(cityName, typeRoomId))
      .then((response) => {
        console.log(response.data);
        setListSpace(response.data);
      })

      .catch((e) => console.log(e));
  }, [cityName, typeRoomId]);
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
