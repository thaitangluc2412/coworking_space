import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./ReservationRequest.module.css";
import {
  IoIosArrowRoundBack,
  IoIosPerson,
  IoMdPhonePortrait,
} from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import Carousel from "react-elastic-carousel";
import {
  IoAlarmSharp,
  IoWalletSharp,
  IoCloseCircleSharp,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import http from "../../config/axiosConfig";

import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";
import { toast } from "react-toastify";

const ReservationRequest = () => {
  const params = useParams();
  const [reservation, setReservation] = useState({});
  const [room, setRoom] = useState({});

  document.title = "Rental Request | Roomless";

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
    http
      .put(
        `reservations/${id}?reservationStatusName=CANCELLED&email=${reservation.email}`
      )
      .then((res) => {
        console.log("new reservation: ", res.data);
        setReservation(res.data);
        toast.success("You cancelled the request");
      });
  };

  const handleApproveRequest = () => {
    http
      .put(
        `reservations/${id}?reservationStatusName=PAYING&email=${reservation.email}`
      )
      .then((res) => {
        setReservation(res.data);
        toast.success("You approve the request");
      });
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
            ALL REQUESTS
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
        <div>
          <div className={classes.detail}>
            <label>Rental request information:</label>
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
                Amount: <span>{reservation.total} $</span>
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
            <div style={{ paddingTop: "20px" }}>
              {" "}
              <label>Customer Information:</label>
            </div>

            <div className={classes.rentInfo}>
              <p>
                <span>
                  <IoIosPerson className={classes.inline} />
                </span>{" "}
                Name: <span>{reservation.customerName}</span>
              </p>
            </div>
            <div className={classes.rentInfo}>
              <p>
                <span>
                  <HiOutlineMail className={classes.inline} />
                </span>{" "}
                Email: <span>{reservation.email}</span>
              </p>
            </div>
            <div className={classes.rentInfo}>
              <p>
                <span>
                  <IoMdPhonePortrait className={classes.inline} />
                </span>{" "}
                Phone: <span>{reservation.phoneNumber}</span>
              </p>
            </div>
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

          <div className={classes.btnContainer}>
            <button
              className={"flex flex-col items-center w-full"}
              disabled={reservation.reservationStatusName !== "PENDING"}
              onClick={handleApproveRequest}
              style={{
                backgroundColor: `${
                  reservation.reservationStatusName !== "PENDING"
                    ? "rgb(175,176,176)"
                    : "#44ac44"
                }`,
              }}
            >
              <span>
                <IoCheckmarkCircleSharp />
              </span>
              Approve
            </button>
            <button
              className={"flex flex-col items-center w-full"}
              disabled={
                reservation.reservationStatusName === "CANCELLED" ||
                reservation.reservationStatusName === "APPROVED"
              }
              onClick={handleCancelRequest}
              style={{
                backgroundColor: `${
                  reservation.reservationStatusName === "CANCELLED" ||
                  reservation.reservationStatusName === "APPROVED"
                    ? "rgb(175,176,176)"
                    : "#eb626c"
                }`,
              }}
            >
              <span>
                <IoCloseCircleSharp />
              </span>
              Cancel
            </button>
          </div>
        </div>
        <div className={classes.roomAndMap}>
          <div className={classes.room}>
            <div
              className={"text-2xl font-semibold text-primary mb-5 text-center"}
            >
              {reservation.roomName}
            </div>
            <Carousel showArrows={true}>
              {listImages.map((image) => (
                <div className="w-full h-[500px] mb-4" key={image.id}>
                  <img
                    className="w-full h-full object-cover "
                    src={image.url}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationRequest;
