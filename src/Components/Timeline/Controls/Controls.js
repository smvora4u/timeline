import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BookMarkManager from "./BookMarkManager.js";
import plus from "../../../Assets/plus.svg";
import minus from "../../../Assets/minus.svg";
import bookmarks from "../../../Assets/bookmarkCircle.svg";
import ZoomSlider from "./ZoomSlider.js";
import ViewControls from "./ViewControls.js";

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

function Controls() {
  const timeline = useSelector((state) => state.Timeline.timeline);
  //const itemsDataSet = useSelector((state) => state.Timeline.itemsDataSet);
  //const [fullscreen, setFullscreen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const bookmarkShow =  useSelector((state) => state.BookMarksManager.bookmarkShow);
  const classes = useStyles();

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
  //const handleSearchOpen = () => {
  //  setSearchOpen(!searchOpen);
  //};
  

  return (
    <div className={classes.root}>
      <div className={classes.bookmarks}>
        {bookmarkShow ? <BookMarkManager timeline={timeline} /> : null}
      </div>
   
        {/*
        <ViewControls />
        <span className={classes.controlGroup}>
          <ZoomSlider />
          <div onClick={handleZoomOut}>
            <img src={minus} className={classes.icon} alt="minus" />
          </div>
          <div onClick={handleZoomIn}>
            <img src={plus} className={classes.icon} alt="plus" />
          </div>
        </span>
		  */}
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
        </div>
		  */}
        
        {/*
        <div className={classes.sliderBox}>
          <ZoomSlider
            className={classes.slider}
            getAriaValueText={(value) => value}
            defaultValue={0}
            value={sliderValue}
            step={20}
            onChange={(event, newValue) => setSliderValue(newValue)}
            aria-labelledby="vertical-slider-zoom"
          />
        </div>
		  */}
      
    </div>
  );
}

export default Controls;
