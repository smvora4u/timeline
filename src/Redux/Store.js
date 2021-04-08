import { createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./Reducers";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    //console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    //console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
// const persistedState = {}

const store = createStore(
  rootReducer
  //persistedState
  //compose(
  //  //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
  //  window.__REDUX_DEVTOOLS_EXTENSION__
  //    ? window.__REDUX_DEVTOOLS_EXTENSION__()
  //    : function (f) {
  //        return f;
  //      }
  //),
  //applyMiddleware(logger)
);

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state);
});

console.log(store.getState());

export default store;
