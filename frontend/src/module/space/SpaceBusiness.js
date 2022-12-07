import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";

const SpaceManage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const [reservations, setReservations] = useState([]);
  const getListReservation = useRef({});

  getListReservation.current = () => {
    http
      .get(`reservations/get-by-seller-id/${userId}`)
      .then((res) => {
        console.log(res);
        if (!res.data) return;
        const reservationList = res?.data.map((item) => {
          return {
            id: item.id,
            roomName: item.roomName,
            status: item.reservationStatusName,
            email: item.email,
            startDate: item.startDate,
            endDate: item.endDate,
            total: item.total,
          };
        });
        setReservations(reservationList);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getListReservation.current();
  }, [userId]);

  const handleDelete = (roomId) => {
    console.log("delete", roomId);
    http
      .delete(`rooms/delete/${roomId}`)
      .then((res) => {
        console.log("delete", res);
        toast.success("Delete Success");
        getListReservation.current();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const head = [
    "Room Name",
    "Status",
    "EMail",
    "Start Date",
    "End Date",
    "Total",
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-10">
        Manage Your Business
      </h1>
      <div className="w-full h-full max-w-[1400px]">
        <Table
          head={head}
          data={reservations}
          handleDelete={handleDelete}
          linkTo={"/manage/businessDetail/"}
        ></Table>
      </div>
    </div>
  );
};

export default SpaceManage;
