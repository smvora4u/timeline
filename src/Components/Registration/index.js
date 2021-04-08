import React from 'react';
import {
    CssBaseline,
    Paper,
    Grid,
} from "@material-ui/core";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-activity/dist/react-activity.css';

import { BACKGROUND_COLOR } from "../../Constants/StylesConstants";
import { useStyles } from "../../Constants/StylesConstants";
import { useLocation } from "react-router-dom";
import Signin from "./Signin";
export default function Registration({ children }) {
    const classes = useStyles();
    const pageLocation = useLocation()
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: BACKGROUND_COLOR }}>
                {children}
            </Grid>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
        </Grid>
    );
}