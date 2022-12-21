import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { Pagination } from "@mui/material";
import usePagination from "../../hooks/usePagination";
import { BsSearch } from "react-icons/bs";

const SpaceManage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const userId = user.id;
  const [spaces, setSpaces] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const getListRoom = useRef({});
  const navigate = useNavigate();
  const PER_PAGE = 6;
  const searchData = useMemo(() => {
    const searchHandle = search.trim().toLowerCase();
    if (searchHandle === "") {
      return spaces;
    } else {
      if (spaces) {
        const spacesSearch = spaces.filter((space) => {
          return space.roomName?.toLowerCase().includes(searchHandle);
        });
        return spacesSearch;
      } else {
        return [];
      }
    }
  }, [search, spaces]);
  const count = Math.ceil(searchData.length / PER_PAGE);
  const { currentData, jump } = usePagination(searchData, PER_PAGE);
  getListRoom.current = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
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
    jump(page);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    jump(1);
  };
  const head = ["Name", "Room Type", "Adress", "Price"];
  return (
    <div>
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-primary mb-7">
          Manage Your Spaces
        </h1>
        <Button onClick={() => navigate("/manage/add-space")}>Add Space</Button>
      </div>
      <div className="w-full h-full max-w-[1400px] p-16">
        <div className="relative max-w-[300px] w-full ">
          <input
            className="outline-none pl-5 py-2 pr-8 w-full mb-4 rounded-full border focus:border-primary focus:rounded-xl transition-all"
            placeholder=""
            value={search}
            onChange={handleSearch}
          />
          <div className="absolute right-3 top-3">
            <BsSearch />
          </div>
        </div>
        <Table
          head={head}
          data={currentData()}
          linkTo={"/manage/update-space/"}
          handleDelete={handleDelete}
          isLoading={isLoading}
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
