import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, LinearProgress } from "@material-ui/core";
import Registration from "./Registration";
import UserTimelies from "./UserTimelies";
import TopBar from "./Header/TopBar";
import TopBarWithOptions from "./Header/TopBarWithOptions.js";
import TimelineSlider from "./Timeline/YearSlider";
import Signin from "./Registration/Signin";

import firebase from "firebase/app";
import "firebase/auth";

import { BACKGROUND_COLOR } from "../Constants/StylesConstants";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-activity/dist/react-activity.css";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: BACKGROUND_COLOR,
    overflowY: "hidden",
  },
}));

export default function App({ children }) {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(true);
  const [isLoginRequired, setLoginRequired] = React.useState(true);
  const pageLocation = useLocation();
  //const dispatch=useDispatch()

  React.useEffect(() => {
    // setLoginRequired(false)
    // setLoading(false)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Signed In", user);

        setLoginRequired(false);
      } else {
        console.log("Not In", user);
        setLoginRequired(true);
      }
      setLoading(false);
    });
  }, []);
  const BorderBottomLines = () => {
    return (
      <div
        style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "1px" }}
      >
        <div style={{ border: "2px solid red", borderRadius: 2 }}></div>
        <div
          style={{ border: "2px solid red", marginTop: "4px", borderRadius: 2 }}
        ></div>
      </div>
    );
  };
  return isLoading ? (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  ) : isLoginRequired ? (
    <Registration>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
      />
      {pageLocation["pathname"] === "/" ? (
        <Signin />
      ) : pageLocation["pathname"] !== "/signin" &&
        pageLocation["pathname"] !== "/signup" &&
        pageLocation["pathname"] !== "/forgot_password" ? (
        <Signin />
      ) : (
        children
      )}
    </Registration>
  ) : (
    <Grid
      container
      style={{
        borderLeft: "5px solid red",
        //maxHeight: "100vh",
        overflowY: "hidden",
      }}
      id={pageLocation["pathname"] === "/timeline" ? "main" : "my_timeslines"}
    >
      
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
      />
      {/*
                    <TopBar />
			*/}
      {pageLocation["pathname"] === "/" ? (
        <>
          <TopBar />
          <UserTimelies />
        </>
      ) : pageLocation["pathname"] !== "/my_timelines" &&
        pageLocation["pathname"] !== "/timeline" ? (
        <UserTimelies />
      ) : (
        <div style={{position:'relative'}}>
          <TopBarWithOptions />
          
          {children}
        </div>
      )}
      {/*
      <BorderBottomLines />
	   */}
    </Grid>
  );
}
