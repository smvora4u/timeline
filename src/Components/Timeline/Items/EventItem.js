import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

//const EventItem=(item)=>({
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  eventItem: {
    position: "relative",
    height: "auto",
  },
  eventImg: {
    width: 100,
    height: 120,
    objectFit: "cover",
    backgroundColor: "blue",
    border: "1px solid black",
    marginBottom: 2,
  },
  eventDetails: {
    filter: "drop-shadow(5px 8px 2px black)",
    height: "auto",
  },

  itemEvent: {
    position: "relative",
    height: 135,
    width: 300,
    clipPath: "polygon(0 0, 100% 0, 100% 70%, 97% 80%, 5% 80%, 0 100%)",
    border: "1px solid black",
    backgroundColor: "white",
  },
  leftLine: {
    position: "absolute",
    height: "80%",
    width: 0,
    marginLeft: 5,
    borderRight: "0.25px solid black",
    marginTop: 5,
    marginBottom: 160,
  },
  eventRating: {
    position: "absolute",
    left: "160px",
  },
  eventText: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 10,
    height: "auto",
  },
  eventDate: {
    color: "red",
    fontWeight: "bold",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  eventDescription: {
    lineHeight: "16px",
    height: "48px",
    fontSize: "14px",
    textAlign: "justify",
    paddingRight: "20px",
    overflow: "hidden",
    fontFamily:"Arial"
  },
  eventTags: {
    position: "absolute",
    backgroundColor: "yellow",
    zIndex: -10,
    paddingTop: "120px",
    height: "auto",
    width: "300px",
    top: "0px",
    borderRadius: "0 0 30px 0",
    display: "flex",
    alignItems: "flex-end",
    alignContent: "flex-end",
    fontSize: "13px",
    fontWeight: "bold",
    lineHeight: "15px",
  },
  tagText: {
    color: "blue",
    fontSize: "13px",
    paddingBottom: "15px",
    paddingLeft: "20px",

  },
}));

const EventItem = (props) => {
  const {
    start,
    title,
    description,
    imgURL,
    videoURL,
    audioURL,
    tags,
    starRating,
  } = props.item;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.eventImg} alt="event picture" src={imgURL} />
      <div className={classes.eventItem}>
        <div className={classes.eventDetails}>
          <div className={classes.itemEvent}>
            <div className={classes.leftLine}></div>
            <div className={classes.eventText}>
              <Rating
                className={classes.eventRating}
                value={starRating}
                precision={0.5}
                readOnly
              />
              <div className={classes.eventDate}>{start.toDateString()}</div>
              <div className={classes.eventTitle}>{title}</div>
              <div className={classes.eventDescription}>{description}</div>
            </div>
          </div>
        </div>

        <div className={classes.eventTags}>
          <div className={classes.tagText}>{tags.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};
export default EventItem;
