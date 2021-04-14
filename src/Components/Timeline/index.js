import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import BookMarkControls from "./Controls/BookMarkControls.js";
import TimeRangeSlider from "./Controls/TimeRangeSlider.js";
import Controls from "./Controls/Controls.js";
import {
  setTimeline,
  setTimelineOptions,
  setTimelineGroups,
  setTimelineItems,
  emptyTimelineDatasets,
} from "../../Redux/Actions/TimelineActions.js";
import { setGroupsData } from "../../Redux/Actions/GroupActions.js";
import { setItemsData } from "../../Redux/Actions/ItemActions.js";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { BACKGROUND_COLOR } from "../../Constants/StylesConstants";
import { BACKGROUND_COLOR_CANVAS } from "../../Constants/StylesConstants";
import ViewControls from "./Controls/ViewControls.js";

import optionBtnIcon from "../../Assets/optionsButton.svg";

const BorderBottomLines = ({ handleStatus, handleHeight }) => {
  return (
    <div
      style={{
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "1px",
        height: "50px",
        position: "absolute",
        width: "100%",
        top: "5px",
      }}
      // onMouseDown={handleStatus(true)}
    >
      {/*
      onMouseMove={handleHeight}
      onMouseUp={handleStatus(false)}
			  */}
      <div style={{ border: "2px solid red", borderRadius: 2 }}></div>
      <div
        style={{ border: "2px solid red", marginTop: "4px", borderRadius: 2 }}
      ></div>
    </div>
  );
};

const getTimelines = async (dispatch) => {
  const currentUser = firebase.auth().currentUser;
  await firebase
    .database()
    .ref("Users/" + currentUser.uid + "/Timelines")
    .once("value", async (snapshot) => {
      let fetched = snapshot.val();
      if (fetched) {
        fetched = Object.keys(fetched).map((e) => fetched[e]);
        dispatch(setGroupsData(fetched));
      }
      console.log("timelines", fetched);
    });
};
const getEvents = async (dispatch) => {
  const currentUser = firebase.auth().currentUser;
  await firebase
    .database()
    .ref("Timelines/" + currentUser.uid)
    .once("value", async (snapshot) => {
      let fetched = snapshot.val();
      console.log("fetchede", fetched);
      const events = {};
      if (fetched) {
        Object.keys(fetched).forEach((key) => {
          events[key] = Object.keys(fetched[key]).map((itemKey) => ({
            ...fetched[key][itemKey],
            group: key,
          }));
        });
        console.log("events", events);
        dispatch(setItemsData(events));
      }
    });
};

let heightStep = 1;
let clickTimeout = null;

export default function App() {
  const groupsData = useSelector((state) => state.Groups);
  const itemsData = useSelector((state) => state.Items);
  const userData = useSelector((state) => state.UserData);
  const groupsDataSet = useSelector((state) => state.Timeline.groupsDataSet);
  const itemsDataSet = useSelector((state) => state.Timeline.itemsDataSet);
  const [height, setHeight] = useState(50);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);
  const [first, setFirst] = React.useState(true);

  const handleHeight = (e) => {
    //let k = Number(window.getComputedStyle(root).height.split("px")[0])
    if (status) {
      const handler = e;
      console.log(handler);
      let k = 978;
      console.log(e.clientY, k);
      //let k = window.getComputedStyle(root).height
      //element.style.height = (e.clientY +element.offsetTop) + 'px';
      if (e.clientY > 20 && e.clientY < k && k - e.clientY > 20) {
        //element.style.height = (k- e.clientY) + "px";
        setHeight(k - e.clientY);
      }
    }
  };

  const handleStatus = (value) => () => {
    setStatus(value);
  };


  const changeHeight = () => {
    let heightCal = 20.6;
    if(clickTimeout !== null) {
      // double click logic
      setHeight(50);
      heightStep = 1;
      clearTimeout(clickTimeout);
      clickTimeout = null;
    } else {
      // single click logic
      clickTimeout = setTimeout(() => {
        // first click executes
        if(heightStep === 5) {
          setHeight(50);
          heightStep = 0;
        } else {
          setHeight(window.innerHeight * heightCal * heightStep * 0.01);
        }
        heightStep++;
        clearTimeout(clickTimeout);
        clickTimeout = null;
      },200)
    }

  };


  document.addEventListener('click', (e) => {
    let element = document.querySelector('.optionsBtn');

    if(element.contains(e.target)) {
      element.classList.add('showOptions');
    } else {
      element.classList.remove('showOptions');
    }
  });

  //console.log(groupsData, itemsData, groupsDataSet, itemsDataSet);
  React.useEffect(() => {
    if (first) {
      dispatch(setTimeline());
      dispatch(setTimelineOptions());
      //make api calls to get groups
      getEvents(dispatch);
      getTimelines(dispatch);

      //if (groupsData.length !== 0) {
      try {
        dispatch(setTimelineGroups({ groupsData: groupsData }));
        dispatch(setTimelineItems({ itemsData, groupsData }));
      } catch { }

      //}
      //make api calls to get items
      setFirst(false);
      setLoading(false);
    }
  }, [dispatch, groupsData, itemsData, first, userData]);
  React.useEffect(() => {
    if (!first) {
      //empty the groups and items dataset
      dispatch(emptyTimelineDatasets());
      //reload the groups and items dataset
      //if (groupsData.length !== 0) {
      dispatch(setTimelineGroups({ groupsData: groupsData }));
      //}
      dispatch(setTimelineItems({ itemsData, groupsData }));
    }
  }, [dispatch, first, groupsData, itemsData]);

  React.useEffect(() => {
    window.addEventListener("mouseup", handleStatus(false));
    return () => {
      window.removeEventListener("mouseup", handleStatus(false));
    };
  });

  return (
    <div
      style={{ position: "relative", marginTop: 40 }}
      // onMouseMove={handleHeight}
      // onMouseUp={handleStatus(false)}
    >
      <div style={{
        width: 15,
        height: 17,
        position: 'absolute',
        left: 20,
        zIndex: 1,
        background: '#2F312F'
      }}>
        <div style={{
          width: 3,
          height: 23,
          background: '#fff',
          transform: 'rotate(41deg)',
          zIndex: 1,
          marginLeft: 7,
          marginTop: -2
        }}></div>
      </div>
      <Grid
        item
        lg={12}
        xs={12}
        id="visualization"
        style={{ marginLeft: "20px", resize: "vertical" }}
      >
        <Controls />
        <div
          style={{
            position: "absolute",
            bottom: `${height > 100 ? height - 105 : -70 + height}px`,
            left: "calc(100vw/2 - 125px)",
            backgroundColor: BACKGROUND_COLOR,
            borderRadius: "25px",
            zIndex: 30000,
            userSelect: "none",
            transition: "bottom 0.5s linear"
          }}
        >
          <BookMarkControls />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: `${height > 100 ? height - 93 : -72 + height}px`,
            right: "29px",
            backgroundColor: BACKGROUND_COLOR,
            borderRadius: "30px",
            zIndex: 30000,
            userSelect: "none",
            transition: "bottom 0.5s linear"
          }}
        >
          <ViewControls />
        </div>
      </Grid>
      <Grid container style={{ height: "142px" }}>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            padding: "15px 20px 0px 20px",
            alignItems: "flex-start",
          }}
        >
          <div class="optionsBtn">
            <IconButton onClick={''} style={{ padding: "0px", marginRight: "50px" }}>
              <img src={optionBtnIcon} style={{ height: "45px" }} alt="color" />
            </IconButton>
            <ul class="optionsMenu">
              <li>
                <span>Ctrl Zoom Lock</span>
                <span class="toggleBtn"></span>
              </li>
              <li>
                <span>Files Tabs</span>
                <span class="toggleBtn"></span>
              </li>
              <li>
                <span>Profile Tabs</span>
                <span class="toggleBtn"></span>
              </li>
              <li>
                <span>Tags Tabs</span>
                <span class="toggleBtn"></span>
              </li>
              <li>
                <span>Bookmark Title Display</span>
                <span class="toggleBtn"></span>
              </li>
              <hr />
              <li>
                <span>Background Colors</span>
                <span class="toggleBtn"></span>
              </li>
              <li>
                <span>Background Picture</span>
                <i></i>
                <span class="toggleBtn"></span>
              </li>
            </ul>
          </div>
          <TimeRangeSlider />
          <div />
        </Grid>
        <Grid item xs={4}>
          {/*
          <BookMarkControls />
		  */}
        </Grid>
        <Grid item xs={4}>
          <div />
        </Grid>
      </Grid>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          height: height + "px",
          zIndex: 20000,
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
          overflowX: "hidden",
          backgroundColor: BACKGROUND_COLOR_CANVAS,
          transition: "height 0.5s linear",
        }}
      >
        <BorderBottomLines
          handleStatus={handleStatus}
          // handleHeight={handleHeight}
          changeHeight={changeHeight}
          // heightStep={heightStep}
        />
        <div class="canvasHandle">
          <div
            style={{
              width: "50px",
              height: "100%",
              backgroundColor: "red",
              clipPath: "polygon(0% 0%, 75% 0%,100% 30px, 100% 100%,0% 100%)",
            }}
          ></div>
          <div style={{ flex: 1 }}>{/* content */}</div>
          <div
            style={{
              width: "50px",
              height: "100%",
              backgroundColor: "red",
              clipPath: "polygon(25% 0%, 100% 0%,100% 100%, 0% 100%,0% 30px)",
            }}
          ></div>
          <span 
          class="canvasHandleControl"
          onClick={changeHeight}>
            <img 
              style={{ margin: "3px"}} 
              alt="down" 
              src={require("../../Assets/optionsButton_Down.svg").default} />
          </span>
        </div>
      </div>
    </div>
  );
}
