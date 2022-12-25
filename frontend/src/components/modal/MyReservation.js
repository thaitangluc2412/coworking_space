import { useState, useEffect, useContext } from "react";

import { BsFillArchiveFill, BsSearch } from "react-icons/bs";
import http from "../../config/axiosConfig";
import classes from "./MyReservation.module.css";
import { useAuth } from "../../context/auth-context";
import ReservationCard from "../request/ReservationCard";
import { toast } from "react-toastify";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "@mui/material";

const MyReservation = (props) => {
  const { user } = useAuth();
  const userId = user.id;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  document.title = "My reservation | Coworking-space";

  useEffect(() => {
    http.get(`/reservations/by-customer/${userId}`).then((res) => {
      setData(res.data);
    });
  }, [userId]);

  const handleNotification = () => {
    toast.error("Your reservation must be completed to review");
  };
  const handleSearch = (e) => {};

  const handlePagination = (e, page) => {
    setPage(page);
    console.log("page", page);
    jump(page);
  };

  const PER_PAGE = 4;

  const count = Math.ceil(data.length / PER_PAGE);
  const { currentData, jump } = usePagination(data, PER_PAGE);
  const dataAfterPagination = currentData();
  return (
    <div class={classes.container}>
      <div className="w-full">
        <div className="mx-auto">
          <h2 className={classes.headerr}>
            <span>
              <BsFillArchiveFill className={classes.inline} />
            </span>
            MY RESERVATIONS
          </h2>
        </div>
        <div className="relative max-w-[300px] w-full ml-auto">
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
      </div>
      <ul className={classes.responsiveTable}>
        <li className={classes.tableHeader}>
          <div className={classes.col1}>Room</div>
          <div className={classes.col2}>Room name</div>
          <div className={classes.col3}>Check-in</div>
          <div className={classes.col4}>Check-out</div>
          <div className={classes.col5}>Status</div>
          <div className={classes.col6}>Review</div>
          <div className={classes.col7}>Detail</div>
        </li>

        {userId != null &&
          dataAfterPagination?.map((reservation) => (
            <ReservationCard
              reservation={reservation}
              onActiveModalReview={props.onActiveModalReview}
              handleNotification={handleNotification}
            />
          ))}
      </ul>
      <div className="flex justify-end mt-5">
        <Pagination
          count={count}
          variant="outlined"
          color="primary"
          page={page}
          onChange={handlePagination}
        />
      </div>
      {data.length === 0 && (
        <div>
          <h3>You don't have any reservation yet.</h3>
        </div>
      )}
    </div>
  );
};

export default MyReservation;
