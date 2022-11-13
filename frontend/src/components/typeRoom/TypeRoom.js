import React, { useEffect } from "react";
import { useState } from "react";
import http from "../../config/axiosConfig";
import CardList from "../swiper/CardList";

const TypeRoom = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    http.get("roomTypes").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <section className="mb-10 pl-[70px]">
      <h1 className="mb-2 text-3xl font-semibold">
        Find the space that fits your bussiness
      </h1>
      <h2 className="mb-[80px] text-lg font-light text-gray">
        We have a solution for every needs
      </h2>
      <div className="ml-5">
        <CardList data={data}></CardList>
      </div>
    </section>
  );
};

export default TypeRoom;
