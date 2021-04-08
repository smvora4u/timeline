import React from "react";
import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  TextField,
} from "@material-ui/core";
import CSVReader from "react-csv-reader";
import { THEME_COLOR } from "../../Constants/StylesConstants";
import { DateToday } from "../../Constants/Date";
import { toast } from "react-toastify";
import { Dots } from "react-activity";
import MediaDropDown from "./Helpers/MediaDropDown";
import { uploadImage } from "./Helpers/UploadImage";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

function generateRandomHexCode() {
  const ref = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += ref[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function UploadTimeline({ handleClose }) {
  const currentUser = firebase.auth().currentUser;
  const [username, setUsername] = React.useState("");
  const [date, setDate] = React.useState(DateToday());
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [userImage, setUserImage] = React.useState();
  const [user_data, setUserData] = React.useState([]);
  const [isUploading, setUploading] = React.useState(false);
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    //transformHeader: header =>
    //    header
    //        .toLowerCase()
    //        .replace(/\W/g, '_')
  };
  //const handleForce = (e) => {

  //    setUserData(e)
  //}
  const handleForce = (data, fileInfo) => {
    let newData = data.map((item) => {
      return Object.keys(item).reduce((acc, curr) => {
        if (
          ["tags", "mVideoURL", "mAudioURL", "mPicURL", "mMapsURL", "profileTagURL"].includes(
            curr
          )
        ) {
          acc[curr] = item[curr] ? item[curr].split(",") : [];
        } else {
          acc[curr] = item[curr];
        }
        return acc;
      }, {});
    });
    setUserData(newData);
    console.log(newData);
  };
  const handleDarkSideForce = () => {};
  const handleUploadData = async () => {
    if (username.length === 0) {
      toast.error("Timeline Name is required.");
      return;
    }
    if (!userImage) {
      toast.error("Timeline picture missing.");
      return;
    }
    if (user_data.length === 0) {
      toast.error("No file has been uploaded.");
      return;
    }

    setUploading(true);

    try {
      const upload_refrence = "Users/" + currentUser.uid + "/Timelines";
      const timeline_key = await firebase
        .database()
        .ref(upload_refrence)
        .push()
        .getKey();
      const imageURL = await uploadImage(
        userImage,
        currentUser.uid,
        timeline_key
      );
      if (!imageURL) {
        toast.error("Error uploading image !");
        return;
      }
      await firebase
        .database()
        .ref(upload_refrence + "/" + timeline_key)
        .set({
          username: username,
          date: date,
          time: time,
          timeline_id: timeline_key,
          user_id: currentUser.uid,
          imageURL: imageURL,
          color: generateRandomHexCode(),
          title: username,
          content: "",
        });

      const data_upload = "Timelines/" + currentUser.uid + "/" + timeline_key;
      user_data.forEach(async (item) => {
        const key = await firebase.database().ref(data_upload).push().getKey();
        await firebase
          .database()
          .ref(data_upload + "/" + key)
          .set({
            id: key,
            //group:timeline_key,
            start_date: item["start_date"].toISOString(),
            end_date: item["end_date"].toISOString(),
            type: item["type"],
            content: item["content"],
            title: item["title"],
            description: item["description"],
            ebPicURL: item["ebPicURL"],
            mVideoURL: item["mVideoURL"],
            mAudioURL: item["mAudioURL"],
            mMapsURL: item["mMapsURL"],
            tags: item["tags"],
            starRating: item["starRating"],
            mPicURL: item["mPicURL"],
            profileTagURL: item['profileTagURL']
            // start_time: item['start_time'],
            // end_time: item['end_time'],
            //name: item["name"],
          });
      });
      setUploading(false);
      handleClose();
      toast.success("Data Successfully Uploaded");
    } catch (e) {
      setUploading(false);
      // handleClose()
      console.log(e);
      toast.error("Upload failed.");
    }
  };
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Upload Timeline</DialogTitle>

      <Grid container lg="12" xs="12" sm="12" md="12" justify="center">
        <Grid item lg="11" xs="11" sm="11" md="11">
          <TextField
            placeholder="Timeline Name"
            autoFocus
            label="Timeline Name"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item lg="11" xs="11" sm="11" md="11">
          <TextField
            type="date"
            style={{ marginTop: 20 }}
            label="Date"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item lg="11" xs="11" sm="11" md="11">
          <TextField
            type="time"
            style={{ marginTop: 20 }}
            label="Time"
            fullWidth
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Grid>
        <Grid item lg="11" xs="11" sm="11" md="11" style={{ marginTop: 20 }}>
          <MediaDropDown picture={userImage} setPicture={setUserImage} />
        </Grid>
        <Grid item lg="11" xs="11" sm="11" md="11" style={{ marginTop: 20 }}>
          <CSVReader
            cssClass="csv-reader-input"
            onFileLoaded={handleForce}
            onError={handleDarkSideForce}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputStyle={{ color: THEME_COLOR }}
          />
        </Grid>
        <Grid
          container
          lg="11"
          spacing="1"
          justify="center"
          style={{ marginTop: 20 }}
        >
          {isUploading && (
            <center>
              <Dots />
            </center>
          )}
        </Grid>
        <Grid
          container
          lg="11"
          spacing="1"
          justify="center"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <Grid item lg="6" xs="11" sm="11" md="11">
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              color="primary"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item lg="6" xs="11" sm="11" md="11">
            <Button
              fullWidth
              variant="contained"
              onClick={handleUploadData}
              color="primary"
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
