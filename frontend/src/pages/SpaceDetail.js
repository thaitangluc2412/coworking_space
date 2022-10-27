import React from "react";
import { NavLink } from "react-router-dom";

const SpaceDetail = () => {
  return (
    <div className="px-8 py-6 flex flex-row gap-6">
      <div className="w-[65%]">
        <div className="image w-full h-[500px] shadow-sm mb-1">
          <img
            className="w-full h-full object-cover "
            src="https://images.unsplash.com/photo-1664770052936-221f47b78b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <div className="flex gap-3 items-center px-2">
          <NavLink to={"/"} className=" image-cover w-5 h-5 inline-block">
            <img
              src="/home.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </NavLink>
          <span className="text-2xl"> {">"} </span>
          <NavLink to={"/space-list"}>Listings</NavLink>
          <span className="text-2xl"> {">"} </span>
          <NavLink to={"/space-list"}>Write your own component</NavLink>
        </div>
        <div className="px-5 py-8">
          <h2 className="font-bold text-2xl pb-4">Property features</h2>
          <div className="flex items-center px-2 text-lg gap-10 flex-wrap">
            <div className="flex items-center gap-2 ">
              <img src="/people.svg" alt="" className="w-7 h-7" />
              <span>Maximum 4 people</span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/square.svg" alt="" className="w-7 h-7" />
              <span>
                45m<sup>2</sup>
              </span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/bedroom.svg" alt="" className="w-7 h-7" />
              <span>1 Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/bathroom.svg" alt="" className="w-7 h-7" />
              <span>1 Bathrooms</span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/kitchen.svg" alt="" className="w-7 h-7" />
              <span>1 Kitchens</span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/kitchen.svg" alt="" className="w-7 h-7" />
              <span>1 Kitchens</span>
            </div>
            <div className="flex items-center gap-2 ">
              <img src="/kitchen.svg" alt="" className="w-7 h-7" />
              <span>1 Kitchens</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[35%]">
        <div className="flex flex-col w-full shadow-lg rounded-md p-5">
          <h1 className="name text-2xl font-semibold text-ellipsis line-clamp-2 overflow-hidden text-grayText">
            {" "}
            Spacious double bedroom with Balcony near Jonio metro station{" "}
          </h1>
          <p className="address text-sm font-light text-grayLigherText mb-4">
            Viale Jonio Roma, Italia{" "}
          </p>
          <h3 className="type text-base font-medium text-grayText mb-1">
            Private room
          </h3>
          <div className="text-grayText font-medium mb-1">
            Available from <span className="font-semibold"> 22 Jan 2023 </span>
          </div>
          <div className="flex flex-col text-primary pt-5 pb-7">
            <span className="text-5xl">
              600$<sub className="text-sm">/month</sub>
            </span>
            <span className="text-sm">Utilities Included</span>
          </div>
          <div className="flex flex-col gap-3">
            <button className="px-3 py-2 text leading-8 rounded-full bg-primary shadow-lg w-full text-white">
              Rent now
            </button>
            <button className="px-3 py-2 rounded-full leading-8 bg-white shadow-lg w-full text-primary">
              Request information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
