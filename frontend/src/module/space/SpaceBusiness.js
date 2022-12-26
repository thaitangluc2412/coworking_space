import axios from "axios";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { Pagination } from "@mui/material";
import usePagination from "../../hooks/usePagination";
import { BsSearch } from "react-icons/bs";

const SpaceManage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const [reservations, setReservations] = useState([]);
  const getListReservation = useRef({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

  const searchData = useMemo(() => {
    const searchHandle = search.trim().toLowerCase();
    if (searchHandle === "") {
      return reservations;
    } else {
      if (reservations) {
        const reservationsSearch = reservations.filter((item) => {
          return item.roomName?.toLowerCase().includes(searchHandle);
        });
        return reservationsSearch;
      } else {
        return [];
      }
    }
  }, [search, reservations]);
  const PER_PAGE = 6;

  const count = Math.ceil(searchData.length / PER_PAGE);
  const { currentData, jump } = usePagination(searchData, PER_PAGE);

  const handlePagination = (e, page) => {
    setPage(page);
    jump(page);
  };

  const handleDelete = (reservationId) => {
    console.log("reservation  ", reservationId);
    http
      .delete(`reservations/delete/${reservationId}`)
      .then((res) => {
        console.log("delete", res);
        toast.success("Delete Success");
        getListReservation.current();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    http
      .put(
        `reservations/${reservationId}?reservationStatusName=CANCELLED&email=${reservations.email}`
      )
      .then((res) => {
        console.log("new reservation: ", res.data);
        toast.success("You delete the reservation");
      });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    jump(1);
  };
  const head = [
    "Room Name",
    "Status",
    "EMail",
    "Start Date",
    "End Date",
    "Deposit",
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-10">
        Manage Your Request
      </h1>
      <div className="w-full h-full max-w-[1400px]">
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
          handleDelete={handleDelete}
          linkTo={"/manage/businessDetail/"}
        ></Table>
      </div>
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
  );
};

export default SpaceManage;
