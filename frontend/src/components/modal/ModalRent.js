import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalRent.css";
import DatePicker from "react-datetime";
import { useParams } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { IoIosCalendar, IoIosArrowRoundForward } from "react-icons/io";
import Carousel from "react-elastic-carousel";
import { useContext } from "react";
import http from "../../config/axiosConfig";

const convertDateToString = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const rs = year + "-" + month + "-" + day;
  return rs;
};

const ModalRent = () => {
  const iconArrow = "IoIosArrowRoundForward";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limitDate, setLimitDate] = useState(new Date());
  const [quantityDays, setQuantityDays] = useState(0);
  const [validDates, setValidDates] = useState([]);
  const [price, setPrice] = useState(0);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [isModalPayment, setModalPayment] = useState(false);

  useEffect(() => {
    http.get(`rooms/${id}`).then((res) => {
      setData(res.data);
      setListImages(res.data.images);
    });
  }, []);
  useEffect(() => {
    http
      .get(`http://localhost:8080/api/v1/reservations/get_invalid_date/${id}`)
      .then((res) => {
        setValidDates(res.data);
      });
  }, []);

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
    http
      .get(
        `http://localhost:8080/api/v1/reservations/furthest_valid_date/${id}?from=${date}`
      )
      .then((res) => {
        setLimitDate(res.data);
      });
  }, [startDate]);

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
    <>
      <div className="modal_rent">
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
              <h4>{data.roomName}</h4>
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
          <div className="containerRight">
            <div className="top">
              <h4>Total</h4>
              <div className="pricePerMonth">
                <p>
                  Price/Day: <span>{data.dayPrice} $</span>
                </p>
                <p>
                  Days rent: <span>X {quantityDays}</span>
                </p>
              </div>
              <hr />
              <div className="pricePerMonth">
                <p>
                  Total to confirm:{" "}
                  <span>{data.dayPrice * quantityDays} $</span>
                </p>
              </div>
            </div>
            <div className="btnContainer">
              <button className="btnRent">Next step</button>
            </div>
          </div>
        </div>
      </div>
      <div id="modal-root"></div>
    </>
  );
};

export default ModalRent;
