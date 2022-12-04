import classes from "./RoomCard.module.css";
import { Carousel } from "react-bootstrap";

const RoomCard = (props) => {
  return (
    <div className={classes.room}>
      <p className={classes.header}>Room</p>
      <Carousel>
        {props.images.map((image) => (
          <div className="w-full h-[500px] mb-4" key={image.id}>
            <img
              className="w-full h-full object-cover "
              src={image.url}
              alt=""
            />
          </div>
        ))}
      </Carousel>
      <label className={classes.name}>{props.roomName}</label>
    </div>
  );
};

export default RoomCard;
