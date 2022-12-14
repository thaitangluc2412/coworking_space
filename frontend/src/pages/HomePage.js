import React from "react";

import City from "../components/city/City";
import SearchBox from "../components/searchBox/SearchBox";

import CardList from "../components/swiper/CardList";
import FavoriteSpaces from "../components/swiper/FavoriteSpaces";
import TypeRoom from "../components/typeRoom/TypeRoom";

const HomePage = () => {
  return (
    <div>
      <section className="mb-[100px]">
        <div className="relative">
          <div className="image w-[100%] h-[550px]">
            <img
              src="https://www.build-review.com/wp-content/uploads/2022/05/Design-Workspace.jpg"
              alt="home"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-7">
              <span className="text-5xl text-white font-medium">
                The best space everywhere
              </span>
              <span className="text-xl text-white">
                Spacing bookable directly online
              </span>
            </div>
            <SearchBox></SearchBox>
          </div>
        </div>
      </section>
      <TypeRoom></TypeRoom>
      <section className="mb-10 pl-[70px]">
        <h1 className="mb-2 text-3xl font-semibold">
          Spaces that might be right for you
        </h1>
        <h2 className="mb-[80px] text-lg font-light text-grayCustom">
          We have a solution for every needs
        </h2>
        <div className="ml-5">
          <FavoriteSpaces></FavoriteSpaces>
        </div>
      </section>
      <City />
    </div>
  );
};

export default HomePage;
