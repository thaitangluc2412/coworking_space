import { IoIosArrowRoundDown, IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  IoAlarmSharp,
  IoCheckmarkCircleSharp,
  IoWalletSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./ReservationDetail.module.css";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";
import RoomCard from "./RoomCard";

const ReservationDetail = () => {
  const [reservation, setReservation] = useState({});
  const [listImages, setListImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "Detail reservation | Coworking-space";

  useEffect(() => {
    http.get(`reservations/${id}`).then((res) => {
      console.log("reservation: ", res.data);
      setReservation(res.data);
      setListImages(res.data.images);
    });
  }, []);

  const handleCancelRequest = () => {
    fetch(
      `http://localhost:8080/api/reservation/reservation_status/${reservation.reservationId}?reservationStatus=4`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newReservation = {
          ...reservation,
          reservationStatusId: 4,
        };
        setReservation(newReservation);
        // window.location.reload();
        toast.error("You cancelled the request");
      })
      .catch((err) => console.log(err));
  };

  const handleCompleteRequest = () => {
    fetch(
      `http://localhost:8080/api/reservation/reservation_status/${reservation.reservationId}?reservationStatus=2`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newReservation = {
          ...reservation,
          reservationStatusId: 2,
        };
        setReservation(newReservation);
        // window.location.reload();
        toast.success("You rent the room successfully!");
      })
      .catch((err) => console.log(err));
  };
  const onNavigate = () => {
    navigate(-1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.goBack}>
          <button onClick={() => onNavigate()}>
            <span>
              <IoIosArrowRoundBack className={classes.inline} />
            </span>
            ALL RESERVATIONS
          </button>
        </div>
        <div
          className={classes.status}
          style={{
            backgroundColor: `${
              reservation.reservationStatusName === "CANCELLED"
                ? "#d75a64"
                : reservation.reservationStatusName === "APPROVED"
                ? "#039487"
                : reservation.reservationStatusName === "PENDING"
                ? "#6a5af9"
                : "#fece04"
            }`,
          }}
        >
          {reservation.reservationStatusName}
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.space}>
          <RoomCard roomName={reservation.roomName} images={listImages} />
        </div>
        <div className={classes.information}>
          <div className={classes.wrapper}>
            <div className={classes.inforReservation}>
              <span>Reservation Information</span>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsCheckCircle className={classes.inline} />
                  </span>{" "}
                  Daily rent booked: <span>{reservation.quantity}</span>
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsPaypal className={classes.inline} />
                  </span>{" "}
                  Amount: <span>{reservation.total} VNĐ</span>
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsFillCalendar2CheckFill className={classes.inline} />
                  </span>{" "}
                  Check-in: <span>{reservation.startDate}</span>{" "}
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsFillCalendarXFill className={classes.inline} />
                  </span>{" "}
                  Check-out: <span>{reservation.endDate}</span>
                </p>
              </div>
              <span style={{ marginLeft: "10px" }}>Status Processing</span>
              {reservation.reservationStatusName === "PENDING" && (
                <div
                  className={classes.status1}
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
              {reservation.reservationStatusName === "APPROVED" && (
                <div
                  className={classes.status1}
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
              {reservation.reservationStatusName === "PAYING" && (
                <div
                  className={classes.status1}
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
                      The request is waiting for your deposit.
                    </div>
                    <div className={classes.note}>
                      The request is confirmed by the owner and now you can
                      deposit.
                    </div>
                  </div>
                </div>
              )}
              {reservation.reservationStatusName === "CANCELLED" && (
                <div
                  className={classes.status1}
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
            <div className={classes.paypal}>
              <label>Method payment:</label>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AfXHQGIlOw0Bl--mNCVnaj1fNPWyrWoAmN8B9ZjfcZkkpfy-I_l8lo_JOelcFtNR8GnM5nj1UmDqAD7O",
                }}
              >
                <PayPalButtons
                  disabled={
                    reservation.reservationStatusName !== "PAYING" && true
                  }
                  style={{
                    layout: "horizontal",
                    color: "black",
                    tagline: false,
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            // value: "" + props.reservation.total,
                            value: "" + reservation.total,
                            showSpinner: true,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handleCompleteRequest();
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
            <p className={classes.tagP}>
              - You need the approvement of the owner to deposit the total rent.
            </p>
            <p className={classes.tagP}>
              - If you don't want to rent it anymore, just cancel the request
              reservation.
            </p>
            <div className={classes.btnContainer}>
              <button
                className={classes.btnRent}
                onClick={handleCancelRequest}
                disabled={reservation.reservationStatusName === "APPROVED"}
                style={{
                  backgroundColor: `${
                    reservation.reservationStatusName === "APPROVED" ||
                    reservation.reservationStatusName === "CANCELLED"
                      ? "rgb(175,176,176)"
                      : "#eb626c"
                  }`,
                }}
              >
                Cancel request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;