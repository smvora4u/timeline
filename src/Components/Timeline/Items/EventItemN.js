import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { bookmarkReadyToAdd } from "../../../Redux/Actions/BookmarksActions.js";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import EventDetails from "./EventDetails.js";

//const EventItem=(item)=>({
const generateContrastColor = (color) => {
  const ref = "0123456789abcdef";
  return (
    "#" +
    color
      .slice(1)
      .split("")
      .map((e) => ref[15 - ref.indexOf(e)])
      .join("")
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  eventRow: {
    display: "flex",
    flexDirection: "row"
  },
  eventItem: {
    position: "relative",
    height: "auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
  eventImg: {
    width: 100,
    height: 120,
    objectFit: "cover",
    backgroundColor: "blue",
    border: "1px solid black",
    marginBottom: 2,
  },
  parentImg: {
    width: 70,
    height: 70,
    objectFit: "cover",
    backgroundColor: "blue",
    border: "3px solid yellow",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginTop: 2,
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
    left: "175px",
  },
  eventText: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    height: "auto",
  },
  eventDate: {
    color: "red",
    fontWeight: "bold",
  },
  eventTime: {
    color: "black",
    fontFamily: "Quantico",
    marginLeft: "5px",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily:"Arial"
  },
  eventDescription: {
    lineHeight: "16px",
    height: "48px",
    fontSize: "14px",
    textAlign: "justify",
    paddingRight: "10px",
    overflow: "hidden",
    fontFamily:"Lucida Fax"
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
    fontFamily:"Big Noodle Titling"
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
    color,
    id,
    groupImg,
    profileTagURL
  } = props.item;
  console.log(profileTagURL)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [select, setSelect] = React.useState(false);
  const handleSelect = () => {
    dispatch(bookmarkReadyToAdd({ id, title }));
    setSelect(true);
  };
  const handleUnSelect = () => {
    dispatch(bookmarkReadyToAdd(null));
    setSelect(false);
  };
  return (
    <div>
      <div className={classes.root}>
        <img className={classes.eventImg} alt="event picture" src={imgURL} />
        <div className={classes.eventRow}>
          <img className={classes.parentImg}
            style={{ borderColor: color }}
            alt="event picture" src={profileTagURL === undefined ? groupImg : profileTagURL} />
        <div className={classes.eventItem} onClick={handleSelect}>
       
          <div className={classes.eventDetails}>

            <div className={classes.itemEvent}>
              <div className={classes.leftLine}>
              </div>
              <div className={classes.eventText}>
                <Rating
                  className={classes.eventRating}
                  value={starRating / 2}
                  precision={0.5}
                  readOnly
                />
                <div className={classes.eventDate}>
                  <span style={{fontFamily:"Arial"}}>
                  {start
                    .toUTCString()
                    .split(", ")[1]
                    .split(" ")
                    .slice(0, -2)
                    .join(" ")}
                    </span>
                  <span className={classes.eventTime}>
                    {start
                      .toUTCString()
                      .split(", ")[1]
                      .split(" ")
                      .slice(-2, -1)
                      .join(" ")}
                  </span>
                </div>
                <div className={classes.eventTitle}>{title}</div>
                <div className={classes.eventDescription}>{description}</div>
              </div>
            </div>
          </div>

          <div
            className={classes.eventTags}
            style={{
              backgroundColor: color,
              color: generateContrastColor(color),
            }}
          >
            <div
              className={classes.tagText}
              style={{ color: generateContrastColor(color) }}
            >
              {tags.join(", ")}
            </div>
          </div>
        </div>

        </div>
      </div>
      <Dialog
        open={select}
        onClose={handleUnSelect}
        aria-labelledby="item selected"
        aria-describedby="select an even to view it's details"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "scroll",
          
        }}
        PaperProps={{
          style: {
            borderRadius: "10px",
            overflow:"visible",
            maxWidth: "initial"
          },
        }}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <EventDetails item={props.item} />
      </Dialog>
    </div>
  );
};
export default EventItem;
