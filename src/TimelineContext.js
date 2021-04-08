import React, { createContext } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "./Timeline.css";

const store = createContext();
const { Provider } = store;

const SigninProvider = ({ children }) => {
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, SigninProvider };
