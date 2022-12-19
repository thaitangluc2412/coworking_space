import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { Pagination } from "@mui/material";
import usePagination from "../../hooks/usePagination";

const SpaceManage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const [spaces, setSpaces] = useState([]);
  const [page, setPage] = useState(1);
  const getListRoom = useRef({});
  const navigate = useNavigate();
  const PER_PAGE = 6;

  const count = Math.ceil(spaces.length / PER_PAGE);
  const { currentData, jump } = usePagination(spaces, PER_PAGE);
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
            dayPrice: `${item.dayPrice}$`,
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
  };
  const handlePagination = (e, page) => {
    setPage(page);
    console.log("page", page);
    jump(page)
  };
  const head = ["Name", "Room Type", "Adress", "Price"];
  return (
    <div>
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-primary mb-10">
          Manage Your Spaces
        </h1>
        <Button onClick={() => navigate("/manage/add-space")}>Add Space</Button>
      </div>
      <div className="w-full h-full max-w-[1400px] p-16">
        <Table
          head={head}
          data={currentData()}
          linkTo={"/manage/update-space/"}
          handleDelete={handleDelete}
        ></Table>
        <div className="flex justify-end mt-5">
          <Pagination
            count={count}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceManage;
