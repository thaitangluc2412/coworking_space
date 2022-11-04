import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Card from "./Card";

const CardList = ({ data }) => {
  const onClick = () => {
    // Redirect;
  };

  if (!data) data = [];
  return (
    <div className="movie-list">
      <Swiper spaceBetween={20} slidesPerView={4.2}>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Card
                  roomTypeName={item.roomTypeName}
                  description={item.description}
                  url={item.url}
                  onClick={onClick}
                ></Card>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default CardList;
