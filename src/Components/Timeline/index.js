import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
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
import LCDProfile from "./LowerCanvasDrawer/LCDProfile";
import LCDRatings from "./LowerCanvasDrawer/LCDRatings";
import LCDNode from "./LowerCanvasDrawer/LCDNode";
import LCDComments from "./LowerCanvasDrawer/LCDComments";
import  LCDDialogContent from './LowerCanvasDrawer/LCDDialogContent';

import Packery from "packery";
import Draggabilly from 'packery'

import optionBtnIcon from "../../Assets/optionsButton.svg";

const BorderBottomLines = ({ handleStatus, handleHeight }) => {
  return (
    <div
      style={{
        padding: "0 35px",
        marginBottom: "1px",
        height: "10px",
        position: "absolute",
        width: "100%",
        top: "5px",
        cursor: "n-resize",
        zIndex: "1"
      }}
      onMouseDown={handleStatus(true)}
      // onMouseUp={handleStatus(false)}
      // onMouseMove={handleHeight}
    >
      
        {/*
        onMouseMove={handleHeight}
        onMouseUp={handleStatus(false)}
      */}
        <div style={{ border: "2px solid red", borderRadius: 2 }}></div>
        <div style={{ border: "2px solid red", marginTop: "4px", borderRadius: 2 }}></div>
      
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
  const [select, setSelect] = React.useState(false);

  const handleHeight = (e) => {
    if (status) {
      setHeight(window.innerHeight - e.clientY);
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

  var packryElem = document.getElementById('canvasDrawer');
  // var draggieElems = document.querySelectorAll('#canvasDrawer');

  var pckry = new Packery(packryElem, {
    itemSelector : '.canvasItem',
    gutter: 115
  });
  
  // draggieElems.forEach((canvasItem, i) => {
  //   var draggie = new Draggabilly(canvasItem);

  //   console.log('draggie');
  //   console.log(draggie);

  //   pckry.bindDraggabillyEvents(draggie);
  // });


  document.addEventListener('click', (e) => {
    let element = document.querySelector('.optionsBtn');
    
    if(!element) {
      return;
    }

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
    document.addEventListener("mouseup", handleStatus(false));
    // document.addEventListener("mousemove", handleHeight);
    return () => {
      document.removeEventListener("mouseup", handleStatus(false));
      // document.removeEventListener("mousemove", handleHeight);
    };
  });
  
  
  const handleSelect = () => {
    // dispatch(bookmarkReadyToAdd({ id, title }));
    setSelect(true);
  };
  const handleUnSelect = () => {
    // dispatch(bookmarkReadyToAdd(null));
    setSelect(false);
  };

  const [LCDContentData, setLCDContentData] = useState({});
  
  const expandCanvasItem = (data) => {
    console.log('data', data);
    setLCDContentData(data);
    handleSelect();
  }

  return (
    <div
      style={{ position: "relative", marginTop: 40 }}
      onMouseMove={handleHeight}
      onMouseUp={handleStatus(false)}
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
        <div id="bottomCanvasRightCol"
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
        <div id="bottomCanvasLeftCol"
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
          <div className="optionsBtn">
            <IconButton style={{ padding: "0px", marginRight: "50px" }}>
              <img src={optionBtnIcon} style={{ height: "45px" }} alt="color" />
            </IconButton>
            <ul className="optionsMenu">
              <li>
                <span>Ctrl Zoom Lock</span>
                <span className="toggleBtn"></span>
              </li>
              <li>
                <span>Files Tabs</span>
                <span className="toggleBtn"></span>
              </li>
              <li>
                <span>Profile Tabs</span>
                <span className="toggleBtn"></span>
              </li>
              <li>
                <span>Tags Tabs</span>
                <span className="toggleBtn"></span>
              </li>
              <li>
                <span>Bookmark Title Display</span>
                <span className="toggleBtn"></span>
              </li>
              <hr />
              <li>
                <span>Background Colors</span>
                <span className="toggleBtn"></span>
              </li>
              <li>
                <span>Background Picture</span>
                <i></i>
                <span className="toggleBtn"></span>
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
      <div id="bottomCanvas"
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
          handleHeight={handleHeight}
          changeHeight={changeHeight}
          // heightStep={heightStep}
        />
        <div className="canvasHandle">
          <div
            style={{
              width: "50px",
              height: "100%",
              backgroundColor: "red",
              clipPath: "polygon(0% 0%, 75% 0%,100% 30px, 100% 100%,0% 100%)",
            }}
          ></div>
          <div style={{ flex: 1, padding: "0 30px 20px", marginTop:"50px", overflowY: "scroll" }}>
            {/* bottom canvas content */}
            <div id="canvasDrawer" className="canvasItemContainer">
              
              {/* LCD Profile Item */}
              {groupsData.map((group, index) => {
                return <LCDProfile group={group} expandCanvasItem={expandCanvasItem} />
              })}

              {/* LCD Ratings Item */}
              <LCDRatings />

              {/* LCD Node Item */}
              <LCDNode />

              {/* LCD Comments Item */}
              <LCDComments />
            </div>
          </div>
          <div
            style={{
              width: "50px",
              height: "100%",
              backgroundColor: "red",
              clipPath: "polygon(25% 0%, 100% 0%,100% 100%, 0% 100%,0% 30px)",
            }}
          ></div>
          <span 
          className="canvasHandleControl"
          onClick={changeHeight}>
            <img 
              style={{ margin: "3px"}} 
              alt="down" 
              src={require("../../Assets/optionsButton_Down.svg").default} />
          </span>
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
        <LCDDialogContent data={LCDContentData} />
      </Dialog>
    </div>
  );
}
