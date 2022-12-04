import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import http from "../config/axiosConfig";
import { GiFlowerStar } from "react-icons/gi";
import Carousel from "react-elastic-carousel";
import { useAuth } from "../context/auth-context";

const SpaceDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listImages, setListImages] = useState([]);
  useEffect(() => {
    http.get(`rooms/${id}`).then((res) => {
      setData(res.data);
      setListImages(res.data.images);
    });
  }, []);
  const handleRent = () => {
    if (user.id) {
      navigate(`/rent/${id}`);
    } else {
      navigate("/login");
    }
  };
  console.log(data);
  return (
    <div className="px-8 py-6 flex flex-row gap-6">
      <div className="w-[65%]">
        <Carousel showArrows={true}>
          {listImages.map((image) => (
            <div className="w-full h-[500px] mb-4" key={image.id}>
              <img
                className="w-full h-full object-cover "
                src={image.url}
                alt=""
              />
            </div>
          ))}
        </Carousel>
        <div className="flex gap-3 items-center px-2">
          <NavLink to={"/"} className=" image-cover w-5 h-5 inline-block">
            <img
              src="/home.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </NavLink>
          <span className="text-2xl"> {">"} </span>
          <NavLink to={`/space-list/${data.roomTypeId}`}>Listings</NavLink>
          <span className="text-2xl"> {">"} </span>
          <span to={"/space-list"}>{data.roomName}</span>
        </div>
        <div className="px-5 py-8">
          <h2 className="font-bold text-2xl pb-4">Property features</h2>
          <div className="flex items-center px-2 text-lg gap-10 flex-wrap">
            {data?.utilities?.length > 0 &&
              data?.utilities.map((item) => {
                return (
                  <div className="flex items-center gap-2 ">
                    <GiFlowerStar className="w-7 h-7" />
                    <span>{item.value}</span>
                    <span>{item.name}</span>
                  </div>
                );
              })}
          </div>
          <h3 className="font-bold text-2xl pb-4 mt-10">Description</h3>
          <div>{data.description}</div>
        </div>
      </div>
      <div className="px-5 py-8"></div>
      <div className="flex flex-col w-[35%]">
        <div className="flex flex-col w-full shadow-lg rounded-md p-5">
          <h1 className="name text-2xl font-semibold text-ellipsis line-clamp-2 overflow-hidden text-grayText">
            {" "}
            {data.roomName}{" "}
          </h1>
          <p className="address text-sm font-light text-grayLigherText mb-4">
            {`${data.address}, ${data.city}`}{" "}
          </p>
          <h3 className="type text-base font-medium text-grayText mb-1">
            {data.roomTypeName}
          </h3>
          <div className="text-grayText font-medium mb-1">
            Available from <span className="font-semibold"> 22 Jan 2023 </span>
          </div>
          <div className="flex flex-col text-primary pt-5 pb-7">
            <span className="text-5xl">
              {data.dayPrice}$<sub className="text-sm">/Day</sub>
            </span>
            <span className="text-sm">Utilities Included</span>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="px-3 py-2 text leading-8 rounded-full bg-primary shadow-lg w-full text-white"
              onClick={() => handleRent()}
            >
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
