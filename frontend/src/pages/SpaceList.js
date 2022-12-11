import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Scroll from "react-scroll";

import SpaceItem from "../components/space-list/SpaceItem";
import http from "../config/axiosConfig";
import FilterSpace from "../module/filter/FilterSpace";

const SpaceList = () => {
  Scroll.animateScroll.scrollToTop();

  const [params] = useSearchParams();
  const cityName = params.get("cityName");
  const typeRoomId = params.get("typeRoomId");
  const provinceId = params.get("provinceId");
  const navigate = useNavigate();
  const [listSpace, setListSpace] = useState([]);
  const filter = ({
    cityName = "",
    typeRoomId = "",
    provinceId = "",
    minPrice = "",
    maxPrice = "",
    roomName = "",
  }) => {
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
    if (roomName) {
      urlString.push(`roomName=${roomName}`);
    }

    if (urlString.length !== 0) {
      filterList = filterList.concat(`?${urlString.join("&")}`);
    }
    return filterList;
  };
  useEffect(() => {
    http
      .get(
        filter({
          cityName: cityName,
          typeRoomId: typeRoomId,
          provinceId: provinceId,
        })
      )
      .then((response) => {
        setListSpace(response.data);
      })

      .catch((e) => console.log(e));
  }, [cityName, typeRoomId]);
  const handleFilter = (values) => {
    console.log("Values", values);
    if (Number(values.minPrice) > Number(values.maxPrice)) {
      toast.error("Min Price must be less than max Price");
      return;
    }

    http
      .get(
        filter({
          typeRoomId: values.typeRoomId,
          provinceId: values.city,
          minPrice: values.minPrice,
          maxPrice: values.maxPrice,
          roomName: values.roomName,
        })
      )
      .then((response) => {
        setListSpace(response.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };
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
                averageRating={space.averageRating}
              />
            ))}
        </div>
      </div>
      <div className="w-[40%] right-0 h-full shadow-lg bg-[url('https://images.unsplash.com/photo-1601762429744-46fe92ccd903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')] relative">
        <div className="inset-0 absolute bg-black bg-opacity-40"></div>
        <FilterSpace handleFilter={handleFilter} />
      </div>
    </div>
  );
};

export default SpaceList;
