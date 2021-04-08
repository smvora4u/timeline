import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "./Redux/Store";

import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "./Firebase/FirebaseConfig";

import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Constants/StylesConstants";
import CssBaseline from "@material-ui/core/CssBaseline";

import UserTimelies from "./Components/UserTimelies";

import Timeline from "./Components/Timeline";

import SignIn from "./Components/Registration/Signin";
import SignUp from "./Components/Registration/Signup";
import ForgotPassword from "./Components/Registration/ForgotPassword";

import Intializer from "./Components";

import BookMarkManager from "./Components/Timeline/Controls/BookmarkTester";

firebase.initializeApp(FIREBASE_CONFIG);

//export default function App() {
//  return <BookMarkManager />;
//}
export default function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={"/"}>
          <CssBaseline />
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <Intializer />
            </Route>

            <Intializer>
              <Route
                path={`${process.env.PUBLIC_URL}/my_timelines`}
                component={UserTimelies}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/timeline`}
                component={Timeline}
              />

              <Route
                path={`${process.env.PUBLIC_URL}/signin`}
                component={SignIn}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/signup`}
                component={SignUp}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/forgot_password`}
                component={ForgotPassword}
              />
            </Intializer>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
