import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import bookmark from "../../../Assets/Bookmark.svg";
import backwards from "../../../Assets/backwards.svg";
import play from "../../../Assets/play.svg";
import forwards from "../../../Assets/forwards.svg";
import record from "../../../Assets/RecButton_1.svg";
import { addEvent } from "../../../Redux/Actions/BookmarksActions.js";

const useStyles = makeStyles((theme) => ({
  playbox: {
    height: "36px",
    borderRadius: "25px",
    backgroundColor: "blue",
    //marginBottom: "5px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "176px",
    //margin: "0px auto",
    border: "1px solid white",
    //position: "absolute",
    //left: "calc(100vw/2 - 125px)",
    //zIndex: 10000,
    //bottom: "-55px",
  },
  icon: {
    height: "20px",
  },
}));
const BookMarkControls = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bookmarksData = useSelector((state) => state.Bookmarks);
  const timeline = useSelector((state) => state.Timeline.timeline);
  const [present, setPresent] = useState(null);
  const [timer, setTimer] = useState(null);
  const ids = bookmarksData && bookmarksData.chapterOrder && bookmarksData.chapterOrder.length > 0 ? bookmarksData.chapterOrder
    .map((e) => bookmarksData.chapters[e].eventIds)
    .reduce((acc, curr) => acc.concat(curr), []) : [];
  //console.log(ids);

  const handleBookMarkAdd = () => {
    if (bookmarksData.readyToAdd) {
      dispatch(addEvent(bookmarksData.readyToAdd));
    }
  };

  const handlePlay = () => {
    //clear previous timers
    clearInterval(timer);
    setTimer(null);
    //starting after pause
    timeline.focus(ids[0], {
      animation: {
        duration: 500,
        easingFunction: "easeInCubic",
      },
      zoom: false,
    });
    setPresent(ids[0]);

    //setTimeout(() => {
    //  let k = setInterval(() => {
    //    console.log(present);
    //    timeline.focus(ids[ids.indexOf(present) + 1]);
    //    setPresent(ids[ids.indexOf(present) + 1]);
    //  }, 1000);
    //  setTimer(k);
    //}, 300);
  };
  const handleForwards = () => {
    console.log("handled forwards");
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
    if (present) {
      timeline.focus(ids[ids.indexOf(present) + 1], {
        animation: {
          duration: 500,
          easingFunction: "easeInCubic",
        },
        zoom: false,
      });
      setPresent(ids[ids.indexOf(present) + 1]);
    } else {
      timeline.focus(ids[0], {
        animation: {
          duration: 500,
          easingFunction: "easeInCubic",
        },
        zoom: false,
      });
      setPresent(ids[0]);
    }
  };
  const handleBackwards = () => {
    console.log("handled backwardss");
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
    if (present) {
      timeline.focus(ids[ids.indexOf(present) - 1], {
        animation: {
          duration: 500,
          easingFunction: "easeInCubic",
        },
        zoom: false,
      });
      setPresent(ids[ids.indexOf(present) - 1]);
    } else {
      timeline.focus(ids[0], {
        animation: {
          duration: 500,
          easingFunction: "easeInCubic",
        },
        zoom: false,
      });
      setPresent(ids[0]);
    }
  };
  return (
    <div className={classes.playbox}>
      <div onClick={handleBookMarkAdd}>
        <img className={classes.icon} style={{width:28,height:28,marginRight:-8}} src={bookmark} alt="bookmark" />
      </div>

      <div onClick={handleBackwards}>
        <img className={classes.icon} style={{width:24,height:24}} src={backwards} alt="backwards" />
      </div>

      <div onClick={handlePlay}>
        <img className={classes.icon} style={{width:27,height:23}} src={play} alt="play" />
      </div>

      <div onClick={handleForwards}>
        <img className={classes.icon} style={{width:24,height:24}} src={forwards} alt="forwards" />
      </div>

      <div style={{position:'relative'}}>
        <img className={classes.icon} style={{width:20,height:20, marginRight:6}} src={record} alt="record" />
      </div>
    </div>
  );
};

export default BookMarkControls;
