import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  Grid,
  CardMedia,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  getGroups,
  getTimeline,
  getItems,
  getFirebaseGroupsData,
} from "../Options";
import { useSelector, useDispatch } from "react-redux";
//
//ID SHOULD BE GREATER THAN ZERO FOR EACH GROUP
export default function GroupTemplate({
  group,
  groupsDataSet,
  itemsDataSet,
  groupsData,
  itemsData,
  dispatch,
  toggleItemsInGroup,
}) {
  const [show, setShow] = useState(true);
  const [stateItems, setStateItems] = useState([]);
  const { id, title, imgURL } = group;

  const handleShow = () => {
    console.log(show, "handleShow");

    if (show) {
      const items = itemsDataSet.get({
        filter: (item) => item.group === id,
      });
      console.log(items);
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
    console.log(items);
    items.forEach((item) => {
      itemsDataSet.remove(item.id);
    });

    //remove group
    groupsDataSet.remove(id);
  };
  return (
    <Grid container lg="12" xs="12" style={{ borderBottom: "1px solid white" }}>
      <Grid lg="12" xs="12">
        <CardMedia
          style={{ width: "auto", height: 200, backgroundSize: "contain" }}
          image={imgURL}
          title={title}
        />
        <Grid
          lg="12"
          style={{
            maxWidth: 300,
            backgroundColor: "rgb(47,49,47)",
            color: "white",
            border: "none",
          }}
        >
          <CardHeader title={title} />

          <CardActions>
            <IconButton onClick={() => removeGroup()}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
            {show ? (
              <IconButton onClick={handleShow}>
                <VisibilityOffIcon style={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleShow}>
                <VisibilityIcon style={{ color: "white" }} />
              </IconButton>
            )}
          </CardActions>
        </Grid>
      </Grid>
    </Grid>
  );
}
