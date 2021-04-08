import React, { useState, useEffect } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
//import IconButton from "@material-ui/core/IconButton";
//import AddIcon from "@material-ui/icons/Add";
//import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector, useDispatch } from "react-redux";
import {
  //addEvent,
  deleteEvent,
  //addChapter,
  deleteChapter,
  renameChapter,
  renameEvent,
  handleDrag,
  updateBookmarks,
} from "../../../Redux/Actions/BookmarksActions.js";
//import plus from "../../../Assets/plus.svg";
import minus from "../../../Assets/minus.svg";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  event: {
    marginLeft: "10px",
    //border: "1px solid black",
    //padding: "5px",
    //backgroundColor: "lightblue",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "blue",
    fontWeight: "600",
    overflowY: "hidden",
    marginBottom: "8px",
  },
  eventContent: {
    backgroundColor: "#e0e1e3",
    flex: 1,
    height: "30px",
    lineHeight: "30px",
    paddingLeft: "10px",
    overflowX: "hidden",
    border: "none",
    outline: "none",
    clipPath: "polygon(2% 0%, 100% 0%, 100% 100%, 2% 100%, 0% 90%, 0% 10%)",
  },
  eventDash: {
    height: "30px",
    lineHeight: "30px",
    color: "yellow",
  },
  eventRemove: {
    backgroundColor: "#e0e1e3",
    borderRadius: "0px",
    margin: 0,
    paddingRight: "5px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#e0e1e3",
    },
    clipPath: "polygon(0% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 0% 100%)",
  },
  chapter: {
    width: "100%",
    //padding: "10px",
    paddingRight: "10px",
    margin: "10px 3px",
    //border: "1px solid black",
    borderRadius: "5px",
    color: "yellow",
    fontWeight: "600",
    //height: "30px",
    //display: "flex",
    //alignItems: "center",
    //justifyContent: "space-between",
  },
  chapterHeading: {
    marginLeft: "5px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "blue",
    fontWeight: "600",
    overflowY: "hidden",
    marginBottom: "10px",
    backgroundColor: "#e0e1e3",
    //backgroundColor: "grey",
    paddingLeft: "10px",
    clipPath:
      "polygon(2% 0%, 98% 0%, 100% 10%, 100% 90%, 98% 100%, 2% 100%, 0% 90%, 0% 10%)",
  },
  chapterContent: {
    outline: "none",
    border: "none",
    flex: 1,
    overflowX: "hidden",
    backgroundColor: "inherit",
  },
  deleteChapter: {
    backgroundColor: "inherit",
    borderRadius: "0px",
    paddingRight: "5px",
    margin: 0,
    "&:hover": {
      backgroundColor: "#e0e1e3",
    },
  },
  circle: {
    width: "25px",
    height: "25px",
    backgroundColor: "red",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:after": {
      content: "-",
    },
  },
  selected: {
    //backgroundColor: "blue",
    //transform: "rotate(5deg)",
  },
}));

const Event = ({ event, index, removeEvent, timeline }) => {
  const classes = useStyles();
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch();
  const makeReadOnly = () => {
    setReadOnly(true);
  };
  const makeChangeable = () => {
    setReadOnly(false);
  };
  const handleChange = (ev) => {
    console.log(event, ev.target.value);
    dispatch(renameEvent({ id: event.id, content: ev.target.value }));
  };

  return (
    <Draggable draggableId={event.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={clsx(classes.event, {
            [classes.selected]: snapshot.isDragging,
          })}
        >
          <span
            className={classes.circle}
            {...provided.dragHandleProps}
            onClick={() => {
              timeline.focus(event.id, {
                animation: {
                  duration: 500,
                  easingFunction: "easeInCubic",
                },
                zoom: false,
              });
            }}
          >
            {index + 1}
          </span>
          <span className={classes.eventDash}>-</span>
          <input
            className={classes.eventContent}
            value={event.content}
            type="text"
            readOnly={readOnly}
            onBlur={makeReadOnly}
            onDoubleClick={makeChangeable}
            onChange={handleChange}
          />
          <div onClick={removeEvent} className={classes.eventRemove}>
            <img src={minus} alt="minus" style={{ height: "20px" }} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Chapter = ({
  chapter,
  events,
  index,
  removeEvent,
  removeChapter,
  timeline,
}) => {
  const classes = useStyles();
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch();
  const makeReadOnly = () => {
    setReadOnly(true);
  };
  const makeChangeable = () => {
    setReadOnly(false);
  };
  const handleChange = (ev) => {
    console.log(chapter, ev.target.value);
    dispatch(renameChapter({ id: chapter.id, title: ev.target.value }));
  };
  const eventList = events.map((event, i) => (
    <Event
      key={event.id}
      event={event}
      index={i}
      removeEvent={removeEvent(event.id)}
      timeline={timeline}
    />
  ));
  return (
    <>
      <Draggable draggableId={chapter.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={classes.chapter}
          >
            <div
              {...provided.dragHandleProps}
              className={classes.chapterHeading}
            >
              <input
                className={classes.chapterContent}
                value={chapter.title}
                type="text"
                readOnly={readOnly}
                onBlur={makeReadOnly}
                onDoubleClick={makeChangeable}
                onChange={handleChange}
              />
              <div onClick={removeChapter} className={classes.deleteChapter}>
                <img src={minus} alt="minus" style={{ height: "20px" }} />
              </div>
            </div>
            <Droppable droppableId={chapter.id} type="event">
              {(provided) => (
                <div
                  style={{ minHeight: "50px" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {eventList}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};
const useBookmarkStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "90%",
    backgroundColor: "#47486e",
    border: "2px solid #2f312f",
  },
  body: {
    height: "90%",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollBar: {
      width: "10px",
    },
    scrollBarThumb: {
      backgroundColor: "yellow",
      borderRadius: "10px",
    },
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
}));

const customScrollBarCss = {
  WebkitScrollbar: {
    width: "10px",
  },
  WebkitScrollbarTrack: {
    backgroundColor: "none",
  },
  WebkitScrollbarThumb: {
    backgroundColor: "yellow",
  },
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
        console.log("got bookmarks", fetched);
        //dispatch(updateBookmarks(fetched));
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

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const BookmarksCore = (props) => {
  const data = useSelector((state) => state.Bookmarks);
  
  const dispatch = useDispatch();
  const classes = useBookmarkStyles();
  //const [first, setFirst] = useState(true);

  const removeEvent = (chapterId) => (id) => () => {
    //console.log(chapterId, id);
    dispatch(deleteEvent({ chapterId, id }));
  };
  const removeChapter = (id) => () => {
    dispatch(deleteChapter({ id }));
  };
  const value = usePrevious(data.chapterOrder);
  console.log(value, data.chapterOrder);
  useEffect(() => {
    if (!data) {
      setBookmarks(data);
    }
  }, [data, data.chaptersOrder, value]);
  useEffect(() => {
    if (data.chaptersOrder !== value) {
      setBookmarks(data);
    }
  }, [data, data.chaptersOrder, value]);

  const onDragEnd = (result) => {
    if (result.destination) {
      dispatch(handleDrag(result));
      setBookmarks(data);
    }
  };

  return (
    <>
      <div className={classes.body} style={{ customScrollBarCss }}>
        <div className={classes.wrapper}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapter-drop-space" type="chapter">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.chapterOrder && data.chapterOrder.length > 0 ? data.chapterOrder.map((chapterId, index) => {
                    const chapter = data.chapters[chapterId];
                    const events = chapter.eventIds.map(
                      (eventId) => data.events[eventId]
                    );
                    return (
                      <Chapter
                        key={chapterId}
                        chapter={chapter}
                        events={events}
                        index={index}
                        removeEvent={removeEvent(chapterId)}
                        removeChapter={removeChapter(chapterId)}
                        timeline={props.timeline}
                      />
                    );
                  }) : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default BookmarksCore;
