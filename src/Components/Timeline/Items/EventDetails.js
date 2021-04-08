import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import timeSince from './timeAgo';
import './eventDetailsStyle.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50vw",
    height: "70vh",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  heading: {
    height: "100px",
    padding: "20px 10px 10px 10px",
  },
  headingRow1: {
    display: "flex",
    justifyContent: "space-between",
  },
  time: {
    fontSize: "30px",
    color: "red",
    fontFamily: "Quantico",
    fontStyle: "italic",
  },
  title: {
    fontWeight: 600,
    fontSize: "32px",
  },
  body: {
    height: "calc(100% - 160px)",
    overflowY: "scroll",
    display: "flex",
    width: "100%",
    padding: "10px",
  },
  partA: {
    //backgroundColor: "red",
    width: "75%",
    //height: "500px",
  },
  video: {
    marginTop: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  partB: {
    //backgroundColor: "blue",
    width: "25%",
    //height: "1500px",
  },
  footer: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

const EventDetails = ({ item }) => {
  let longTimeAgo = timeSince(item.start, 0)
  const classes = useStyles();
  const shortTimeAgo =
    console.log("itemd", item);
  const {
    start,
    title,
    description,
    imgURL,
    videoURL,
    mAudioURL,
    tags,
    starRating,
    color,
    id,
    ebPicURL,
    otherImages,
    profileTagURL
  } = item;

  const timeAgoHover = () => {
    document.getElementsByClassName('exact-time-ago')[0].style.visibility = 'visible'
  }
  const timeAgoHoverOut = () => {
    document.getElementsByClassName('exact-time-ago')[0].style.visibility = 'hidden'
  }
  const timeZoneHoverOut = () => {
    document.getElementsByClassName('timezone')[0].style.visibility = 'hidden'
  }
  const timeZoneHover = () => {
    document.getElementsByClassName('timezone')[0].style.visibility = 'visible'
  }
  return (
    <>
      <div className="exact-time-ago">
        <span>{`Exactly ${longTimeAgo}`}</span>
      </div>
      <div className={classes.root} style={{ position: 'relative' }}>

        <div className={classes.heading}>
          <div className={classes.headingRow1}>
            <div className={classes.time}>
              <span style={{ whiteSpace: 'nowrap',fontFamily:"Arial" }}>
                {start
                  .toUTCString()
                  .split(", ")[1]
                  .split(" ")
                  .slice(0, -2)
                  .join(" ")}
              </span>

              <span
                style={{
                  color: "black",
                  marginLeft: "30px",
                  position: 'relative'
                }}
                className="timezone-localtime"
                onMouseLeave={() => timeZoneHoverOut()}
                onMouseEnter={() => timeZoneHover()}
              >
                {start
                  .toUTCString()
                  .split(", ")[1]
                  .split(" ")
                  .slice(-2, -1)
                  .join(" ")}
                <span
                  className="timezone"
                  style={{ color: 'black', position: 'absolute', top: '-32px', right: '-12px', whiteSpace: 'nowrap', fontSize: 16, borderRadius: 4, padding: '3px 4px' }}

                >{`[GMT +${new Date().toGMTString().valueOf().slice(17, 22)}]`}
                </span>
              </span>
            </div>
            <div className="event-detail-icons" style={{ marginLeft: 24 }}>
              <img onMouseLeave={() => timeAgoHoverOut()} onMouseEnter={() => timeAgoHover()} src={require("../../../Assets/timeAgoButton.svg")}
                style={{
                  width: 42,
                  margin: '0 6px',
                  cursor: 'pointer'
                }}
                alt="rightHeader"
              />
              {/* <ReactTimeAgo date={item.start} /> */}

              <span onMouseLeave={() => timeAgoHoverOut()}
                onMouseEnter={() => timeAgoHover()}
                style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                {timeSince(item.start, 1)}
              </span>
              <img src={require("../../../Assets/shareButton.svg")}
                style={{
                  width: 42,
                  margin: '0 6px'
                }}
                alt="rightHeader"
              />
              <img src={require("../../../Assets/Flags/united-states-of-america.png")}
                style={{
                  width: 42,
                  margin: '0 6px'
                }}
                alt="rightHeader"
              />
              <img src={require("../../../Assets/verifiedIcon.svg")}
                style={{
                  width: 42,
                  margin: '0 6px'
                }}
                alt="rightHeader"
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <Rating max={10} value={starRating} size={"large"} readOnly />
            </div>
          </div>
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.body}>
          <div className={classes.partA}>
            {description}
            {videoURL &&
              videoURL.map((e, i) => (
                <div key={i} className={classes.video}>
                  <iframe
                    width="560"
                    height="315"
                    src={e}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              ))}
            {/*
          <video width="320" height="240" controls>
            <source
              src="https://www.youtube.com/embed/QkkoHAzjnUs"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
		  */}
          </div>
          <div className={classes.partB}>
            {otherImages &&
              otherImages.map((e, i) => (
                <img
                  src={e}
                  alt={`image${i}`}
                  style={{ width: "100%", marginBottom: "5px" }}
                />
              ))}
          </div>
        </div>
        <div className={classes.footer} style={{ backgroundColor: color }}>
          {tags.join(", ")}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
