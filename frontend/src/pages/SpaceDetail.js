import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import http from "../config/axiosConfig";
import { GiFlowerStar } from "react-icons/gi";
import Carousel from "react-elastic-carousel";
import { useAuth } from "../context/auth-context";
import Rating from "@mui/material/Rating";

const SpaceDetail = () => {
  const { user } = useAuth();
  const userId = user.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [listComment, setListComment] = useState([]);
  let averageRating = data.averageRating !== undefined ? data.averageRating : 0;
  useEffect(() => {
    http.get(`rooms/${id}?customerId=${userId}`).then((res) => {
      setData(res.data);
      setListImages(res.data.images);
    });

    http.get(`reviews/rooms/${id}`).then((res) => setListComment(res.data));
  }, []);

  const handleRent = () => {
    if (user.id) {
      navigate(`/rent/${id}`);
    } else {
      navigate("/login");
    }
  };
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
          <NavLink to={`/space-list?typeRoomId=${data.roomTypeId}`}>
            Listings
          </NavLink>
          <span className="text-2xl"> {">"} </span>
          <span to={"/space-list"}>{data.roomName}</span>
        </div>
        <div className="px-5 py-8">
          <h2 className="font-bold text-2xl pb-4">Property features</h2>
          <div className="flex items-center px-2 text-lg gap-10 flex-wrap">
            {data?.utilities?.length > 0 &&
              data?.utilities.map((item, index) => {
                return (
                  <div className="flex items-center gap-2 " key={index}>
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
            <Rating
              name="simple-controlled"
              defaultValue={averageRating}
              value={averageRating}
              precision={0.5}
              readOnly
            />
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
        {listComment.length > 0 && (
          <div className="w-full max-h-[400px] overflow-scroll rounded-sm shadow-lg p-5 mt-10 bg-white">
            {listComment.map((comment, index) => (
              <div
                className="flex flex-col  bg-slate-100 p-3 my-5 rounded"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-11 h-11">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqXZFnoB9eMvcBSXMRQrtLBL_JhTfjZFbtcu9DiBoJfu4qqFZleZRD_6WTtfoMXkNZB0&usqp=CAU"
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {comment.customerName}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: "200",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {comment.timeCreate}{" "}
                  </div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={comment.rating}
                    precision={1}
                    readOnly
                  />
                </div>
                <div className="mt-4">{comment.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceDetail;
