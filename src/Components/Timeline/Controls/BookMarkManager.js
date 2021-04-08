import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import BookMarkTester from "./BookmarkTester.js";
import {
  addChapter,
  updateBookmarks,
} from "../../../Redux/Actions/BookmarksActions.js";
import plus from "../../../Assets/plus.svg";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  rootClip: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%,  0 97%)",
    backgroundColor: "#2f312f",
    padding: "0px 2px 2px 2px",
    height: "100%",
    weight: "100%",
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#6c6c6e",
    borderTop: "2px solid #2f312f",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%,  0 97%)",
  },
  heading: {
    height: "7%",
    margin: 10,
    borderBottom: "4px solid blue",
    fontSize: 26,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    fontFamily: "Bai Jamjuree",
    fontWeight: "bold",
    color: "red",
  },
  body: {
    height: "89%",
    //overflowY: "scroll",
    overflowX: "hidden",
  },
  addChapter: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
  },
  addButton: {
    padding: "5px",
  },
  playbox: {
    height: "50px",
    margin: "15px 10px",
    borderRadius: "25px",
    backgroundColor: "blue",
    marginTop: "26px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  group: {
    margin: "5px 22px 5px 5px",
    backgroundColor: "wheat",
    borderRadius: "5px",
    padding: "0px 5px",
    height: "32px",
    lineHeight: "32px",
    fontWeight: "bold",
  },
  item: {
    margin: "3px 22px 3px 15px",
    height: "28px",
  },
  itemIndex: {
    backgroundColor: "red",
    border: "1px solid black",
    borderRadius: "16px",
    width: "32px",
    height: "32px",
    padding: "2px 6px",
  },
  itemTitle: {
    backgroundColor: "wheat",
    lineHeight: "28px",
    height: "28px",
    marginLeft: "5px",
    padding: "0px 5px",
    borderRadius: "5px",
  },
  star: {
    fontSize: "48px",
    color: "yellow",
  },
  skipNext: {
    fontSize: "54px",
    color: "green",
  },
  skipPrevious: {
    fontSize: "54px",
    color: "green",
  },
  playArrow: {
    fontSize: "54px",
    color: "red",
  },
}));

const initData = {
  events: {},
  chapters: {},
  chapterOrder: [],
  readyToAdd: {},
};
const getBookmarks = async (dispatch, updateBookmarks) => {
  const currentUser = firebase.auth().currentUser;
  await firebase
    .database()
    .ref("Users/" + currentUser.uid + "/Bookmarks")
    .once("value", async (snapshot) => {
      let fetched = snapshot.val();
      console.log("get", currentUser.uid);
      console.log("got bookmarks", fetched);
      if (fetched) {
        //fetched = Object.keys(fetched).map((e) => fetched[e]);
        //console.log("got bookmarks", fetched);
        dispatch(updateBookmarks(fetched));
      } else {
        console.log("using init Data");
        dispatch(updateBookmarks(initData));
      }
      //console.log(fetched);
    });
};
const setBookmarks = async (bookmarks) => {
  try {
    const currentUser = firebase.auth().currentUser;
    console.log("set", currentUser.uid, bookmarks);
    await firebase
      .database()
      .ref("Users/" + currentUser.uid + "/Bookmarks")
      .set(bookmarks);
  } catch (err) {
    toast.error("bookmarks not updated, check your internet connection");
  }
};

function BookMarkManager({ timeline }) {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const handleAddChapter = () => {
    dispatch(addChapter());
  };

  useEffect(() => {
    getBookmarks(dispatch, updateBookmarks);
  });

  return (
    <div className={classes.rootClip}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.heading}>
            BOOKMARK{" "}
            <span style={{ color: "#42ad49", marginLeft: "10px" }}>
              MANAGER
            </span>
          </div>
          <div className={classes.body}>
            <div className={classes.addChapter} onClick={handleAddChapter}>
              <img src={plus} style={{ height: "20px" }} alt="plus" />
            </div>
            <BookMarkTester timeline={timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMarkManager;
