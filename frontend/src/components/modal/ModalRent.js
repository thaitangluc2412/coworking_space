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
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
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
  const [quantityMonths, setQuantityMonths] = useState(0);
  const [quantityYears, setQuantityYears] = useState(0);
  const [validDates, setValidDates] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [typePrice, setTypePrice] = useState("dayPrice");
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
      total:
        (data.dayPrice * quantityDays +
          data.monthPrice * quantityMonths +
          data.yearPrice * quantityYears) *
        0.2,
      deposit:
        0.1 *
        (data.dayPrice * quantityDays +
          data.monthPrice * quantityMonths +
          data.yearPrice * quantityYears),
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
    if (typePrice === "dayPrice") {
      setQuantityDays((new Date(date) - new Date(startDate)) / 86400000 + 1);
      setQuantityYears(0);
      setQuantityMonths(0);
    }
    if (typePrice === "monthPrice") {
      const price = monthDiff(new Date(endDate), new Date(startDate));
      setQuantityYears(0);
      setQuantityMonths(price[0]);
      setQuantityDays(price[1]);
    }
    if (typePrice === "yearPrice") {
      const price = dateDiff(new Date(endDate), new Date(startDate));
      setQuantityYears(price[0]);
      setQuantityMonths(price[1]);
      setQuantityDays(price[2]);
    }
  };

  const handleChangePrice = (e) => {
    setTypePrice(e.target.value);
    if (e.target.value === "dayPrice") {
      setQuantityDays((new Date(endDate) - new Date(startDate)) / 86400000 + 1);
      setQuantityYears(0);
      setQuantityMonths(0);
    }
    if (e.target.value === "monthPrice") {
      const price = monthDiff(new Date(endDate), new Date(startDate));
      setQuantityYears(0);
      setQuantityMonths(price[0]);
      setQuantityDays(price[1]);
    }
    if (e.target.value === "yearPrice") {
      const price = dateDiff(new Date(endDate), new Date(startDate));
      setQuantityYears(price[0]);
      setQuantityMonths(price[1]);
      setQuantityDays(price[2]);
    }
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
              <div className="">
                <p>Choose your price type:</p>
                <div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="dayPrice"
                    name="radio-buttons-group"
                    row={true}
                    onChange={handleChangePrice}
                  >
                    <FormControlLabel
                      value="dayPrice"
                      control={<Radio color={"success"} />}
                      label="Day Price"
                    />
                    <FormControlLabel
                      value="monthPrice"
                      control={<Radio color={"success"} />}
                      label="Month Price"
                    />
                    <FormControlLabel
                      value="yearPrice"
                      control={<Radio color={"success"} />}
                      label="Year Price"
                    />
                  </RadioGroup>
                </div>
              </div>
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
              <div className="w-full bg-slate-200 h-[1px] mb-1"></div>
              <p>
                Price/Month: <span>{data.monthPrice} $</span>
              </p>
              <p>
                Months rent: <span>X {quantityMonths}</span>
              </p>
              <div className="w-full bg-slate-200 h-[1px] mb-1"></div>
              <p>
                Price/Year: <span>{data.yearPrice} $</span>
              </p>
              <p>
                Years rent: <span>X {quantityYears}</span>
              </p>
            </div>
            <hr />
            <div className={classes.pricePerMonth}>
              <p>
                Total to confirm:{" "}
                <span>
                  {data.dayPrice * quantityDays +
                    data.monthPrice * quantityMonths +
                    data.yearPrice * quantityYears}{" "}
                  $
                </span>
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

function dateDiff(date1, date2) {
  var daysDiff = Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  var years = Math.floor(daysDiff / 365.25);
  var remainingDays = Math.floor(daysDiff - years * 365.25);
  var months = Math.floor((remainingDays / 365.25) * 12);
  var days = Math.ceil(daysDiff - (years * 365.25 + (months / 12) * 365.25));

  return [years, months, days];
}

function monthDiff(date1, date2) {
  var daysDiff = Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  var years = Math.floor(daysDiff / 365.25);
  var remainingDays = Math.floor(daysDiff - years * 365.25);
  var months = Math.floor((remainingDays / 365.25) * 12);
  var days = Math.ceil(daysDiff - (years * 365.25 + (months / 12) * 365.25));
  months = months + years * 12;
  return [months, days];
}

export default ModalRent;
