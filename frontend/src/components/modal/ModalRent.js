import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalRent.module.css";
import DatePicker from "react-datetime";
import { useParams } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { IoIosCalendar, IoIosArrowRoundForward } from "react-icons/io";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { format } from "date-fns";
const convertDateToString = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate() + 1;
  const year = dateObj.getUTCFullYear();
  const rs = year + "-" + month + "-" + day;
  return format(new Date(rs), "yyyy-MM-dd");
};

const ModalRent = (props) => {
  const { user } = useAuth();
  const userId = user.id;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limitDate, setLimitDate] = useState(new Date());
  const [quantityDays, setQuantityDays] = useState(0);
  const [validDates, setValidDates] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    http.get(`rooms/${id}`).then((res) => {
      setData(res.data);
      setListImages(res.data.images);
    });
  }, []);
  useEffect(() => {
    http.get(`reservations/get_invalid_date/${id}`).then((res) => {
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
      .get(`reservations/furthest_valid_date/${id}?from=${date}`)
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

  const onActiveModalPayment = () => {
    const reservation = {
      roomId: data.id,
      customerId: userId,
      startDate: convertDateToString(startDate),
      endDate: convertDateToString(endDate),
      quantity: quantityDays,
      total: data.dayPrice * quantityDays,
      deposit: 0.05 * data.dayPrice * quantityDays,
    };
    props.onActiveModalPayment(reservation);
  };

  const chooseStartDate = (date) => {
    setStartDate(date);
    if (new Date(date) > new Date(endDate)) {
      setEndDate(date);
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
    <div className={classes.modal_rent}>
      <div className={classes.container}>
        <div className={classes.containerLeft}>
          <div className={classes.top}>
            <h4>Booking details</h4>
            <div className={classes.bookDetails}>
              <div className={classes.datePickerWrapper}>
                <p>Check-in</p>
                <div className={classes.date_picker_wrapper}>
                  <DatePicker
                    onChange={(date) => chooseStartDate(date)}
                    wrapperClassName="datePicker"
                    value={startDate}
                    minDate={new Date()}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableCustomDt}
                    timeFormat={false}
                  />
                  <span>
                    <IoIosCalendar className={classes.iconCarlendar} />
                  </span>
                </div>
              </div>
              <div className={classes.arrow}>
                <p>
                  <span>
                    <IoIosArrowRoundForward />
                  </span>
                </p>
              </div>
              <div className={classes.datePickerWrapper}>
                <p>Check-out</p>
                <div className={classes.date_picker_wrapper}>
                  <DatePicker
                    onChange={(date) => chooseEndDate(date)}
                    wrapperClassName={classes.datePicker}
                    value={endDate}
                    minDate={startDate}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableEndDate}
                    timeFormat={false}
                  />
                  <span>
                    <IoIosCalendar className={classes.iconCarlendar} />
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.underInfo}>
              <p>
                Enter your <b>actual check-out date.</b>
              </p>
              <p>
                If you book for a shorter period you are not guaranteed to be
                able to renew!
              </p>
            </div>
            <h4>{data.roomName}</h4>
            {/* <Carousel>
              {listImages.map((image) => (
                <div className="w-full h-[500px] mb-4" key={image.id}>
                  <img
                    className="w-full h-full object-cover "
                    src={image.url}
                    alt=""
                  />
                </div>
              ))}
            </Carousel> */}

            <div>
              <Swiper
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                parallax={true}
              >
                {listImages.map((image) => (
                  <SwiperSlide>
                    <div className="w-full h-[500px] mb-4" key={image.id}>
                      <img
                        className="w-full h-full object-contain"
                        src={image.url}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.top}>
            <h4>Total</h4>
            <div className={classes.pricePerMonth}>
              <p>
                Price/Day: <span>{data.dayPrice} $</span>
              </p>
              <p>
                Days rent: <span>X {quantityDays}</span>
              </p>
            </div>
            <hr />
            <div className={classes.pricePerMonth}>
              <p>
                Total to confirm: <span>{data.dayPrice * quantityDays} $</span>
              </p>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnRent} onClick={onActiveModalPayment}>
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRent;
