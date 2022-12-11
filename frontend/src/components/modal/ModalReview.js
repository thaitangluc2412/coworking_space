import { useState, useEffect, useRef } from "react";
import classes from "./ModalReview.module.css";
import ReactDOM from "react-dom";
import Rating from "@mui/material/Rating";
import { useAuth } from "../../context/auth-context";
import http from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModalReview = (props) => {
  const [rating, setRating] = useState(0);
  const content = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleExitModal = (event) => {
    event.preventDefault();
    props.onExitModalReview();
  };

  const handleReview = () => {
    const review = {
      customerId: user.id,
      roomId: props.reservation.roomId,
      content: content.current.value,
      rating: rating,
    };

    http
      .post("reviews", review)
      .then((res) => {
        console.log(res);
        navigate(`myreservation`);
        props.onExitModalReview();
        toast.success("Review success");
      })
      .catch((err) => console.log(err));
  };

  return ReactDOM.createPortal(
    <div className={classes.modalReview}>
      <div className={classes.titleFilter}>
        <a href="#" className={classes.close} onClick={handleExitModal} />
        <h2>Review room</h2>
      </div>
      <div className={classes.content}>
        <div className={classes.rating}>
          <div style={{ paddingBottom: "20px" }}>
            <span>Room name: </span>
            {props.reservation.roomName}
          </div>
          <div>
            <div
              className={classes.containerRating}
              style={{ paddingBottom: "20px" }}
            >
              <label>Rating: </label>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div style={{ paddingBottom: "10px" }}>Write your review:</div>
            <textarea className={classes.textReview} ref={content}></textarea>
            <div className={classes.btn}>
              <button onClick={() => handleReview()}>Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalReview;
