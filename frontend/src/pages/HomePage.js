import React from "react";
import SearchBox from "../components/searchBox/SearchBox";
import Card from "../components/swiper/Card";
import CardList from "../components/swiper/CardList";

const HomePage = () => {
  return (
    <div>
      <section className="mb-[100px]">
        <div className="relative">
          <div className="image w-[100%] h-[550px]">
            <img
              src="https://images.unsplash.com/photo-1615793171325-4aba32a8c4ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="home"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-7">
              <span className="text-4xl text-white">
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
      <section className="mb-10 pl-[70px]">
        <h1 className="mb-2 text-3xl font-semibold">
          Find the space that fits your bussiness
        </h1>
        <h2 className="mb-[80px] text-lg font-light text-gray">
          We have a solution for every needs
        </h2>
        <div className="ml-5">
          <CardList></CardList>
        </div>
      </section>
      <section className="mb-10 pl-[70px]">
        <h1 className="mb-2 text-3xl font-semibold">
          Find the space that fits your bussiness
        </h1>
        <h2 className="mb-[80px] text-lg font-light text-gray">
          We have a solution for every needs
        </h2>
        <div className="ml-5">
          <CardList></CardList>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
