import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";

const SpaceManage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const [spaces, setSpaces] = useState([]);
  const getListRoom = useRef({});

  getListRoom.current = () => {
    http
      .get(`rooms/getByCustomerId/${userId}`)
      .then((res) => {
        console.log(res);
        if (!res.data) return;
        const spaceList = res?.data.map((item) => {
          return {
            id: item.id,
            roomName: item.roomName,
            roomType: item.roomTypeName,
            address: `${item.address} ${item.city}`,
            description: item.description,
          };
        });

        setSpaces(spaceList);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getListRoom.current();
  }, [userId]);

  const handleDelete = (roomId) => {
    console.log("delete", roomId);
    http
      .delete(`rooms/delete/${roomId}`)
      .then((res) => {
        console.log("delete", res);
        toast.success("Delete Success");
        getListRoom.current();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    // const token = localStorage.getItem("token");
    // axios
    //   .get(`rooms/delete/${roomId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     console.log("response: ", res);
    //   })
    //   .catch((err) => {
    //     console.log("error: ", err);
    //   });
  };
  const head = ["Name", "Room Type", "Adress", "Description"];
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-10">
        Manage Your Spaces
      </h1>
      <div className="w-full h-full max-w-[1400px] p-16">
        <Table head={head} data={spaces} handleDelete={handleDelete}></Table>
      </div>
    </div>
  );
};

export default SpaceManage;
