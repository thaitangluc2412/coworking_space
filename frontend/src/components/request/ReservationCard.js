import classes from "./ReservationCard.module.css";
import { useState, useEffect } from "react";
import {
  IoAlarmSharp,
  IoCheckmarkCircleSharp,
  IoWalletSharp,
  IoCloseCircleSharp,
  IoChatbubbleOutline,
  IoDocumentsOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

const ReservationCard = (props) => {
  const handleReview = () => {
    if (props.reservation.reservationStatusName !== "APPROVED") {
      props.handleNotification();
    } else {
      props.onActiveModalReview(props.reservation);
    }
  };

  return (
    <li class={classes.tableRow}>
      <div class={classes.col1} data-label="Job Id">
        {props.reservation.images.length > 0 && (
          <img
            className={classes.image}
            src={`${props.reservation.images[0].url}`}
            alt="First slide"
            style={{
              width: "100%",
              height: "80px",
            }}
          />
        )}
      </div>
      <div class={classes.col2} data-label="Customer Name">
        <div
          className={classes.infoCus}
          style={{ width: "240px", text: "center" }}
        >
          <p>{props.reservation.roomName}</p>
        </div>
      </div>
      <div class={classes.col3} data-label="Check-in">
        <div className={classes.checkDate}>{props.reservation.startDate}</div>
      </div>
      <div class={classes.col4} data-label="Checkout">
        <div className={classes.checkDate}>{props.reservation.endDate}</div>
      </div>
      <div class={classes.col5} data-label="Payment Status">
        {props.reservation.reservationStatusName === "PENDING" && (
          <div
            className={classes.status}
            style={{
              border: "1px solid #6a5af9",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "#6a5af9",
              }}
            >
              <IoAlarmSharp />
            </div>
            <div className={classes.text}>
              <div
                className={classes.notify}
                style={{
                  color: "#6a5af9",
                }}
              >
                The request must be confirmed.
              </div>
              <div className={classes.note}>
                The request must be confirmed by the owner of the room.
              </div>
            </div>
          </div>
        )}
        {props.reservation.reservationStatusName === "APPROVED" && (
          <div
            className={classes.status}
            style={{
              border: "1px solid #44ac44",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "#44ac44",
              }}
            >
              <IoCheckmarkCircleSharp />
            </div>
            <div className={classes.text}>
              <div
                className={classes.notify}
                style={{
                  color: "#44ac44",
                }}
              >
                The request is completed.
              </div>
              <div className={classes.note}>
                The owner accepted and you paid the total.
              </div>
            </div>
          </div>
        )}
        {props.reservation.reservationStatusName === "PAYING" && (
          <div
            className={classes.status}
            style={{
              border: "1px solid #fece04",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "#fece04",
              }}
            >
              <IoWalletSharp />
            </div>
            <div className={classes.text}>
              <div
                className={classes.notify}
                style={{
                  color: "#fece04",
                }}
              >
                The request is ready for paying.
              </div>
              <div className={classes.note}>
                The request is confirmed by the owner and now you can deposit.
              </div>
            </div>
          </div>
        )}
        {props.reservation.reservationStatusName === "CANCELLED" && (
          <div
            className={classes.status}
            style={{
              border: "1px solid #d75a64",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "#d75a64",
              }}
            >
              <IoCloseCircleSharp />
            </div>
            <div className={classes.text}>
              <div
                className={classes.notify}
                style={{
                  color: "#d75a64",
                }}
              >
                The request has been cancelled.
              </div>
              <div className={classes.note}>
                The request is rejected by the owner or cancelled by you.
              </div>
            </div>
          </div>
        )}
      </div>
      <div class={classes.col6}>
        <div className={classes.btn}>
          <button onClick={handleReview} disabled={props.reservation.reviewed}>
            <IoChatbubbleOutline
              style={{
                color: `${
                  props.reservation.reviewed ? "rgb(175,176,176)" : "#1D8489"
                }`,
              }}
            />
          </button>
        </div>
      </div>

      <div class={classes.col7}>
        <div className={classes.btn}>
          <NavLink
            to={{
              pathname: `/reservation/${props.reservation.id}`,
            }}
          >
            <button>
              <IoDocumentsOutline />
            </button>
          </NavLink>
        </div>
      </div>
    </li>
  );
};

export default ReservationCard;
