import React, { useState } from "react";
import {
  CardHeader,
  CardActions,
  IconButton,
  Grid,
  CardMedia,
  Modal,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { ChromePicker } from "react-color";
import colorIcon from "../../../Assets/colour.svg";
import groupFilterIcon from  "../../../Assets/groupFilter_.svg";
import groupFindIcon from "../../../Assets/groupFind_.svg";
import storyModeIcon from "../../../Assets/storyMode.svg";
import tabOnOffIcon from "../../../Assets/tabOnOff.svg";
import { setGroupColor } from "../../../Redux/Actions/GroupActions.js";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { toast } from "react-toastify";

const setFirebaseGroupColor = (color, timeline_key) => {
  const currentUser = firebase.auth().currentUser;
  console.log("set", `Users/${currentUser.uid}/Timelines/${timeline_key}`);
  firebase
    .database()
    .ref("Users/" + currentUser.uid + "/Timelines/" + timeline_key)
    .update({ color })
    .catch((err) => {
      toast.error("bookmarks not updated, check your internet connection");
    });
};
//ID SHOULD BE GREATER THAN ZERO FOR EACH GROUP
export default function GroupTemplate({ group }) {
  const groupsDataSet = useSelector((state) => state.Timeline.groupsDataSet);
  const itemsDataSet = useSelector((state) => state.Timeline.itemsDataSet);
  const dispatch = useDispatch();
  //console.log(groupsDataSet, itemsDataSet);
  const [show, setShow] = useState(true);
  const [stateItems, setStateItems] = useState([]);
  const { id, title, imageURL } = group;
  //console.log("group", group);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [color, setColor] = useState("#ffffff");

  const handleShow = () => {
    //console.log(show, "handleShow");

    if (show) {
      const items = itemsDataSet.get({
        filter: (item) => item.group === id,
      });
      //console.log(items);
      items.forEach((item) => {
        itemsDataSet.remove(item.id);
      });
      setStateItems(items);
      setShow(false);
    } else {
      stateItems.forEach((item) => {
        itemsDataSet.add(item);
      });
      setStateItems([]);
      setShow(true);
    }
  };

  const removeGroup = () => {
    //remove items
    const items = itemsDataSet.get({
      filter: (item) => item.group === id,
    });
    //console.log(items);
    items.forEach((item) => {
      itemsDataSet.remove(item.id);
    });

    //remove group
    groupsDataSet.remove(id);
  };

  const filterTimeline = () => {
    alert('filterTimeline button clicked..');
  }

  const storyMode = () => {
    alert('storyMode button clicked..');
  }

  const showHideGroup = () => {
    alert('showHideGroup button clicked..');
  }

  const gotoGroup = () => {
    alert('gotoGroup button clicked..');
  }
  //console.log("cl", imageURL);
  return (
    <>
      <Grid container style={{ borderBottom: "1px solid white" }}>
        <Grid item xs={12}>
          <CardMedia
            style={{
              width: "auto",
              height: 200,
              backgroundSize: "contain",
              border: `4px solid ${group.color}`,
              backgroundColor: group.color,
            }}
            image={imageURL}
            title={title}
          />
          <Grid
            item
            lg={12}
            style={{
              maxWidth: 330,
              backgroundColor: "rgb(47,49,47)",
              color: "white",
              //border: "none",
            }}
          >
            <CardHeader
              title={title}
              style={{ border: `2px solid ${group.color}`, fontFamily: "K2D" }}
              titleTypographyProps={{
                style: {
                  fontFamily: "K2D",
                  fontWeight: "bold",
                },
              }}
            />

            <CardActions style={{ cursor: "default" }}>
              <IconButton onClick={() => removeGroup()} style={{ padding : "12px 5px" }}>
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
              <IconButton onClick={handleOpenModal} style={{ padding : "12px 5px" }}>
                <img src={colorIcon} style={{ height: "30px" }} alt="color" />
              </IconButton>
              <IconButton onClick={showHideGroup} style={{ padding : "12px 5px" }}>
                <img src={tabOnOffIcon} style={{ height: "30px" }} alt="color" />
              </IconButton>
              <IconButton onClick={filterTimeline} style={{ padding : "12px 5px" }}>
                <img src={groupFilterIcon} style={{ height: "30px" }} alt="color" />
              </IconButton>
              <IconButton onClick={storyMode} style={{ padding : "12px 5px" }}>
                <img src={storyModeIcon} style={{ height: "30px" }} alt="color" />
              </IconButton>
              <IconButton onClick={gotoGroup} style={{ padding : "12px 5px" }}>
                <img src={groupFindIcon} style={{ height: "30px" }} alt="color" />
              </IconButton>
              {show ? (
                <IconButton onClick={handleShow} style={{ padding : "12px 5px" }}>
                  <VisibilityOffIcon style={{ color: "white" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleShow} style={{ padding : "12px 5px" }}>
                  <VisibilityIcon style={{ color: "white" }} />
                </IconButton>
              )}
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="color picker"
        aria-describedby="pick a color for the group"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChromePicker
          color={color}
          onChangeComplete={(color) => {
            dispatch(setGroupColor({ id, color: color.hex }));
            //make call to backend to fix the changes in the server.
            setFirebaseGroupColor(color.hex, id);
          }}
        />
      </Modal>
    </>
  );
}
