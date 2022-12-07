import { useState, useEffect, useContext } from "react";

import { BsFillArchiveFill } from "react-icons/bs";
import http from "../../config/axiosConfig";
import classes from "./MyReservation.module.css";
import { useAuth } from "../../context/auth-context";
import ReservationCard from "../request/ReservationCard";
import { toast } from "react-toastify";

const MyReservation = (props) => {
  const { user } = useAuth();
  const userId = user.id;
  const [data, setData] = useState([]);

  document.title = "My reservation | Coworking-space";

  useEffect(() => {
    http.get(`/reservations/by-customer/${userId}`).then((res) => {
      setData(res.data);
    });
  }, [userId]);

  const handleNotification = () => {
    toast.error("Your reservation must be completed to review");
  };

  return (
    <div class={classes.container}>
      <h2 className={classes.headerr}>
        <span>
          <BsFillArchiveFill className={classes.inline} />
        </span>
        MY RESERVATIONS
      </h2>
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
          data?.map((reservation) => (
            <ReservationCard
              reservation={reservation}
              onActiveModalReview={props.onActiveModalReview}
              handleNotification={handleNotification}
            />
          ))}
      </ul>

      {data.length === 0 && (
        <div>
          <h3>You don't have any reservation yet.</h3>
        </div>
      )}
    </div>
  );
};

export default MyReservation;
