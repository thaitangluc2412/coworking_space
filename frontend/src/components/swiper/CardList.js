import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Card from "./Card";

const cards = [
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
  {
    header: "Luxury",
    desc: "High-level, recently renovated properties in central locations. Perfect solutions for enjoying every city.",
  },
];
const CardList = () => {
  return (
    <div className="movie-list">
      <Swiper spaceBetween={20} slidesPerView={4.2} grabCursor={true}>
        {cards.length > 0 &&
          cards.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Card desc={item.desc} header={item.header}></Card>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default CardList;
