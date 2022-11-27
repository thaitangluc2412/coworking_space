import ReactDOM from "react-dom";
import "./ModalPayment.css";

import { useState, useRef, useContext, useEffect } from "react";
import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";

const ModalPayment = (props) => {
  const [customer, setCustomer] = useState({});
  console.log("asdasdasds");
  const exitRegister = (event) => {
    // NotificationManager.info('Info message');
    event.preventDefault();
    props.onExitModalPayment();
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <a href="#" onClick={exitRegister} className="close" />
        <h3>Rent request information</h3>
      </header>
      <div className="container">
        <div className="inner_container">
          <div className="control">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={customer.customerName}
              disabled={true}
            />
          </div>
          <div className="control">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={customer.email}
              disabled={true}
            />
          </div>
          <div className="control">
            <label htmlFor="phone">Your Phone:</label>
            <input
              type="text"
              id="phone"
              value={customer.phoneNumber}
              disabled={true}
            />
          </div>
          <div className="rentInfo">
            <p>
              <span>
                <BsCheckCircle />
              </span>{" "}
              Daily rent booked: <span>"props.reservation.quantity"</span>
            </p>
          </div>
          <div className="rentInfo">
            <p>
              <span>
                <BsPaypal />
              </span>{" "}
              Amount: <span>"props.reservation.total" $</span>
            </p>
          </div>
          <div className="rentInfo">
            <p>
              <span>
                <BsFillCalendar2CheckFill />
              </span>{" "}
              Check-in: <span>"props.reservation.startDate"</span>{" "}
            </p>
          </div>
          <div className="rentInfo">
            <p>
              <span>
                <BsFillCalendarXFill />
              </span>{" "}
              Check-out: <span>"props.reservation.endDate"</span>
            </p>
          </div>
          <p>
            Checking carefully the information about rent request to make sure
            you don't send them wrong.
          </p>
          <div className="btnContainer">
            <button className="btnRent">Request</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalPayment;
