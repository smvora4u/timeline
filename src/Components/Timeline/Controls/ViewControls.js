import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BookMarkManager from "./BookMarkManager.js";
import plus from "../../../Assets/plus.svg";
import minus from "../../../Assets/minus.svg";
import {setBookmarkManagerShow} from '../../../Redux/Actions/BookmarkManagerActions'
import bookmarks from "../../../Assets/bookmarkCircle.svg";
import ZoomSlider from "./ZoomSlider.js";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: "20px",
    bottom: "-50px",
    display: "flex",
    flexDirection: "column",
    zIndex: 10000,
  },
  bookmarks: {
    width: "300px",
    height: "70vh",
    marginBottom: 30,
  },
  search: {
    marginRight: 10,
  },
  controls: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  controlGroup: {
    border: "1px solid white",
    padding: "0px 10px",
    borderRadius: "30px",
    display: "flex",
  },
  iconButton: {
    backgroundColor: "rgba(20, 22, 23, 0.66)",
    marginBottom: "5px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "rgba(20, 22, 23, 1)",
      transform: "scale(1.1)",
    },
  },
  icon: {
    color: "white",
    height: "40px",
  },
  slider: {
    marginTop: "10px",
    minHeight: 100,
    maxHeight: 100,
  },
  sliderBox: {
    marginTop: 10,
    paddingRight: 8,
  },
}));

function ViewControls() {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const timeline = useSelector((state) => state.Timeline.timeline);
  const bookmarkShow = useSelector((state) => state.BookMarksManager.bookmarkShow);
  const dispatch = useDispatch()
  const handleZoomIn = () => {
    if (timeline) {
      timeline.zoomIn(0.8);
    }
  };
  const handleZoomOut = () => {
    if (timeline) {
      timeline.zoomOut(0.7);
    }
  };
  //const requestFullScreen = () => {
  //  const d = document.getElementById("root");
  //  if (document.fullscreen) {
  //    document
  //      .exitFullscreen()
  //      .then((res) => {
  //        setFullscreen(false);
  //      })
  //      .catch((err) => console.log("fullscreen not deactivated"));
  //  } else {
  //    d.requestFullscreen()
  //      .then((res) => {
  //        setFullscreen(true);
  //      })
  //      .catch((err) => console.log("fullscreen not activated"));
  //  }
  //};
  const handleBookmarksOpen = () => {
    console.log(bookmarkShow);
    dispatch(setBookmarkManagerShow(!bookmarkShow));
  };
  return (
    <>
      <div className={classes.controlGroup}>
        <ZoomSlider />
        <div onClick={handleZoomOut} style={{display:'flex', alignItems:'center'}}>
          <img src={minus} style={{ width: 20, height: 20 }} className={classes.icon} alt="minus" />
        </div>
        <div onClick={handleZoomIn} style={{display:'flex', alignItems:'center'}}>
          <img src={plus} style={{ width: 20, height: 20 }} className={classes.icon} alt="plus" />
        </div>
        <div onClick={handleBookmarksOpen} style={{display:'flex', alignItems:'center'}}>
          <img style={{ width: 24, height: 24 }}  src={bookmarks} className={classes.icon} alt="bookmarks" />
        </div>
      </div>
      {/*
        <div
          size="small"
          className={classes.iconButton}
          onClick={requestFullScreen}
        >
          {fullscreen ? (
            <FullscreenExit fontSize="large" className={classes.icon} />
          ) : (
            <Fullscreen fontSize="large" className={classes.icon} />
          )}
		  */}
    </>
  );
}

export default ViewControls;
