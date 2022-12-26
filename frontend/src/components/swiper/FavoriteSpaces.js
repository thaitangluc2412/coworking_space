import React, { useEffect, useState } from "react";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import SpaceItem from "../space-list/SpaceItem";
import FavoriteItem from "./FavoriteItem";

const FavoriteSpaces = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    http.get(`rooms/favorite/customer/${user.id}`).then((res) => {
      setData(res.data);
    });
  }, [user]);
  return (
    <div className="movie-list">
      <Swiper spaceBetween={20} slidesPerView={4.2}>
        {data.length > 0 &&
          data.map((space, index) => {
            return (
              <SwiperSlide key={index}>
                <FavoriteItem
                  key={space.id}
                  url={space.images[0].url}
                  address={`${space.address}, ${space.city}`}
                  roomName={space.roomName}
                  roomTypeName={space.roomTypeName}
                  dayPrice={space.dayPrice}
                  id={space.id}
                  typeRoomId={space.typeRoomId}
                  averageRating={space.averageRating}
                ></FavoriteItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default FavoriteSpaces;
