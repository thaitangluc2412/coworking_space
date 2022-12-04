import ReactDOM from "react-dom";
import classes from "./ModalPayment.module.css";
import http from "../../config/axiosConfig";
import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const ModalPayment = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const exitRegister = (event) => {
    event.preventDefault();
    props.onExitModalPayment();
  };
  const onSubmit = () => {
    http
      .post("reservations", props.reservation)
      .then((res) => {
        props.onExitModalPayment();
        navigate("/myreservation");
      })
      .catch((err) => console.log(err));
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitRegister} className={classes.close} />
        <h3>Rent request information</h3>
      </header>
      <div className={classes.container}>
        <div className={classes.inner_container}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={user.customerName}
              disabled={true}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={user.email} disabled={true} />
          </div>
          <div className={classes.control}>
            <label htmlFor="phone">Your Phone:</label>
            <input
              type="text"
              id="phone"
              value={user.phoneNumber}
              disabled={true}
            />
          </div>
          <div className={classes.rentInfo}>
            <p>
              <span>
                <BsCheckCircle className={classes.inline} />
              </span>{" "}
              Daily rent booked: <span>{props.reservation.quantity}</span>
            </p>
          </div>
          <div className={classes.rentInfo}>
            <p>
              <span>
                <BsPaypal className={classes.inline} />
              </span>{" "}
              Amount: <span>{props.reservation.total}$</span>
            </p>
          </div>
          <div className={classes.rentInfo}>
            <p>
              <span>
                <BsFillCalendar2CheckFill className={classes.inline} />
              </span>{" "}
              Check-in: <span>{props.reservation.startDate}</span>{" "}
            </p>
          </div>
          <div className={classes.rentInfo}>
            <p>
              <span>
                <BsFillCalendarXFill className={classes.inline} />
              </span>{" "}
              Check-out: <span>{props.reservation.endDate}</span>
            </p>
          </div>
          <p style={{ paddingTop: "30px" }}>
            Checking carefully the information about rent request to make sure
            you don't send them wrong.
          </p>
          <div className={classes.btnContainer}>
            <button className={classes.btnRent} onClick={() => onSubmit()}>
              Request
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalPayment;
