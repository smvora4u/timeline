import React from "react";
import { useHistory } from "react-router-dom";
import DataTable from "./DataTable";
import { Grid, Button } from "@material-ui/core";
import { AddToQueue, CloudUpload } from "@material-ui/icons";
import UploadTimeline from "./UploadTimeline";

import { useDispatch } from "react-redux";
import { setItemsData } from "../../Redux/Actions/ItemActions";
import { setGroupsData } from "../../Redux/Actions/GroupActions";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default function App() {
  const currentUser = firebase.auth().currentUser;
  console.log("currentUser", currentUser);
  const [uploadModal, setUploadModal] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState([]);
  let group_items = {};
  const pageHistory = useHistory();
  const dispatch = useDispatch();
  const setItems = (items) => dispatch(setItemsData(items));
  const setGroups = (groups) => dispatch(setGroupsData(groups));

  const processData = async () => {
    for (var element = 0; element < selectedData.length; element++) {
      const timeline_id = selectedData[element]["timeline_id"];
      await firebase
        .database()
        .ref("Timelines/" + currentUser.uid + "/" + timeline_id)
        .once("value", async (snapshot) => {
          const items_array = [];
          const fetched_items = snapshot.val();

          Object.keys(fetched_items).forEach((element) => {
            items_array.push(fetched_items[element]);
          });
          group_items = { ...group_items, [timeline_id]: items_array };
        });
    }
  };

  const onPressShowTimeline = async () => {
    setGroups(selectedData);
    await processData();
    setItems(group_items);
    pageHistory.push(`${process.env.PUBLIC_URL}/timeline`);
  };
  const onPressUploadTimeine = () => {
    setUploadModal(true);
  };
  const closeUploadTimelineModal = () => {
    setUploadModal(false);
  };

  return (
    <Grid container justify="center">
      <Grid
        container
        lg="11"
        xs="11"
        sm="11"
        style={{ marginBottom: "1%", marginTop: "2%" }}
      >
        
        <Grid item lg="2" xs="6" sm="6">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddToQueue />}
            onClick={onPressShowTimeline}
          >
            Show TimeLine
          </Button>
        </Grid>
        <Grid item lg="2" xs="6" sm="6">
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={onPressUploadTimeine}
          >
            Upload Timeline
          </Button>
        </Grid>
      </Grid>

      <Grid
        item
        lg="11"
        xs="11"
        sm="11"
        style={{
          marginBottom: "120px",
          minHeight: "70vh",
          maxHeight: "70vh",
          overflowY: "scroll",
        }}
      >
        
        <DataTable setSelectedRows={setSelectedData} />
      </Grid>
      {uploadModal && <UploadTimeline handleClose={closeUploadTimelineModal} />}
    </Grid>
  );
}
