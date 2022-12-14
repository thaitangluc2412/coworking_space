import React from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router";
const FavoriteItem = ({
  url,
  roomTypeName,
  address,
  roomName,
  dayPrice,
  id,
  averageRating,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/space/${id}`);
  };
  return (
    <div className="w-[320px] h-[500px] bg-white rounded-lg overflow-hidden">
      <div className="w-full h-[300px] relative">
        <img src={url} alt="" className="w-full h-full object-cover" />
        <div className="inline-block text-xs px-1 py-1 rounded-full text-grayText bg-white absolute top-1 right-1">
          <Rating
            name="half-rating-read"
            defaultValue={averageRating}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
      <div className="flex w-full h-[200px] flex-col px-3 pt-1 pb-3">
        <h3 className="type text-sm text-grayText mb-1">{roomTypeName}</h3>
        <h1 className="name text-xl font-medium text-ellipsis line-clamp-2 overflow-hidden ">
          {roomName}
        </h1>
        <p className="address text-sm font-light text-grayLigherText">
          {address}
        </p>
        <div className="flex w-full justify-between text-primary mt-auto">
          <span className="text-2xl">
            {dayPrice}$<sub className="text-xs">/Day</sub>
          </span>
          <button
            className="px-3 py-1 rounded-full bg-white shadow-xl button-animation"
            onClick={() => handleClick()}
          >
            Rent now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
