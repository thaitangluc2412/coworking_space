import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalRent.css";
import DatePicker from "react-datetime";

import "react-datetime/css/react-datetime.css";
import { IoIosCalendar, IoIosArrowRoundForward } from "react-icons/io";
import Carousel from "react-elastic-carousel";
import { useContext } from "react";

const convertDateToString = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const rs = year + "-" + month + "-" + day;
  return rs;
};

const ModalRent = (props) => {
  const iconArrow = "IoIosArrowRoundForward";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limitDate, setLimitDate] = useState(new Date());
  const [quantityDays, setQuantityDays] = useState(1);
  const [validDates, setValidDates] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/reservation/get_invalid_date/" +
        props.room?.roomId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setValidDates(data.data);
      });
  }, [validDates]);

  const disableCustomDt = (current) => {
    if (validDates) {
      return (
        !validDates.includes(current.format("YYYY-MM-DD")) &&
        new Date(current) > new Date()
      );
    }
  };
  useEffect(() => {
    const date = convertDateToString(startDate);

    console.log(date);
    fetch(
      `http://localhost:8080/api/reservation/furthest_valid_date/${props.room?.roomId}?from=${date}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("Ngay limit ne" + data.data);
        setLimitDate(data.data);
        // setLimitDate("2022-05-29");
      });
  }, [startDate]);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/price/" + props.room?.priceId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.data.dayPrice);
      })
      .catch((err) => console.log(err));
  }, []);

  const disableEndDate = (current) => {
    return (
      new Date(current) <= new Date(limitDate) &&
      new Date(current) >= new Date(startDate) &&
      new Date(current) >= new Date() &&
      startDate != null
    );
  };

  //   const onActiveModalPayment = () => {
  //     const reservation = {
  //       roomId: props.room.roomId,
  //       customerId: authCtx.id,
  //       createDate: convertDateToString(new Date()),
  //       startDate: convertDateToString(startDate),
  //       endDate: convertDateToString(endDate),
  //       quantity: quantityDays,
  //       reservationStatusId: 1,
  //       total: price * quantityDays,
  //       deposit: 0.2,
  //     };
  //     props.onActiveModalPayment(reservation);
  //   };

  const chooseStartDate = (date) => {
    setStartDate(date);
    if (new Date(date) > new Date(endDate)) {
      setEndDate(date);
      console.log(new Date(endDate));
      setQuantityDays(1);
    } else {
      setQuantityDays((new Date(endDate) - new Date(date)) / 86400000 + 1);
    }
  };

  const chooseEndDate = (date) => {
    setEndDate(date);
    setQuantityDays((new Date(date) - new Date(startDate)) / 86400000 + 1);
  };

  return (
    <div className="modal_rent">
      <header className="modal__header">
        <h3>Rent request</h3>
      </header>
      <div className="container">
        <div className="containerLeft">
          <div className="top">
            <h4>Booking details</h4>
            <div className="bookDetails">
              <div className="datePickerWrapper">
                <p>Check-in</p>
                <div className="date_picker_wrapper">
                  <DatePicker
                    // selected={startDate}
                    // placeholderText="Pick day..."
                    onChange={(date) => chooseStartDate(date)}
                    wrapperClassName="datePicker"
                    value={startDate}
                    minDate={new Date()}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableCustomDt}
                    timeFormat={false}
                    // onNavigateBack={(amount, type) =>
                    //   console.log(amount + "  " + type)
                    // }
                    // onNavigateForward={(month, year) =>
                    //   console.log(month + "  " + year)
                    // }

                    // ref={startDateRef}
                  />
                  <span>
                    <IoIosCalendar className="iconCarlendar" />
                  </span>
                </div>
              </div>
              <div className="arrow">
                <p>
                  <span>
                    <IoIosArrowRoundForward />
                  </span>
                </p>
              </div>
              <div className="datePickerWrapper">
                <p>Check-out</p>
                <div className="date_picker_wrapper">
                  <DatePicker
                    onChange={(date) => chooseEndDate(date)}
                    wrapperClassName="datePicker"
                    value={endDate}
                    minDate={startDate}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableEndDate}
                    timeFormat={false}
                  />
                  <span>
                    <IoIosCalendar className="iconCarlendar" />
                  </span>
                </div>
              </div>
            </div>
            <div className="underInfo">
              <p>
                Enter your <b>actual check-out date.</b>
              </p>
              <p>
                If you book for a shorter period you are not guaranteed to be
                able to renew!
              </p>
            </div>
            {/* <h4>Request amentities</h4>
            <div className="amentity}>
                <p> <span><IoArrowForwardCircle /> </span>Desk 
                <input type="checkbox"></input></p>
               
            </div> */}
            <h4>"props.room.name"</h4>
            {/* <div
              className="imageRoom}
              style={{
                backgroundImage: `url('${props.room.image}')`,
              }}
            ></div> */}
            {/* <Carousel className="carouse" slide={false} controls={true}> */}
            {/* {props.room.images?.map((image) => ( */}
            {/* <Carousel.Item className="item">
                <img
                  className="imageRoom"
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item className="item">
                <img
                  className="imageRoom"
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item className="item">
                <img
                  className="imageRoom"
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt="First slide"
                />
              </Carousel.Item> */}
            {/* ))} */}
            {/* </Carousel> */}
            <Carousel>
              {/* {listImages.map((image) => ( */}
              <div className="w-full h-[500px] mb-4">
                <img
                  className="w-full h-full object-cover "
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt=""
                />
              </div>
              <div className="w-full h-[500px] mb-4">
                <img
                  className="w-full h-full object-cover "
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt=""
                />
              </div>
              <div className="w-full h-[500px] mb-4">
                <img
                  className="w-full h-full object-cover "
                  src="https://www.fohlio.com/hs-fs/hubfs/Imported_Blog_Media/The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg?width=2048&height=1365&name=The-Anatomy-of-Good-Coworking-Space-Design-In-Pictures-Fohlio-Product-Specification-and-Materials-Budget-Calculator-The-Assemblage-1.jpg"
                  alt=""
                />
              </div>
              {/* ))} */}
            </Carousel>
          </div>
        </div>
        <div className="containerRight">
          <div className="top">
            <h4>Total</h4>
            <div className="pricePerMonth">
              <p>
                Price/Day: <span>{price} $</span>
              </p>
              <p>
                Days rent: <span>X {quantityDays}</span>
              </p>
            </div>
            <hr />
            <div className="pricePerMonth">
              <p>
                Total to confirm: <span>{price * quantityDays} $</span>
              </p>
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnRent">Next step</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRent;
