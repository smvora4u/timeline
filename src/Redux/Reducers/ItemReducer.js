import {
  SET_ITEMS_DATA,
  SET_DEFAULT_PROPERTIES_FOR_ALL_ITEMS,
  TOGGLE_ITEMS_IN_GROUP,
} from "../Actions/ItemActions";
//import { items } from "./dummydata.js";
const initState = {};

export default function ItemsReducer(state = initState, action) {
  let temp = {};
  switch (action.type) {
    case SET_ITEMS_DATA:
      return action.payload;

    case SET_DEFAULT_PROPERTIES_FOR_ALL_ITEMS:
      temp = { ...state };
      Object.keys(state).forEach((key) => {
        let tempGroupItems = [...temp[key]];
        tempGroupItems = tempGroupItems.map((item) => {
          //set default values for all items
          item.show = true;
          return item;
        });
        temp[key] = tempGroupItems;
      });
      return temp;

    case TOGGLE_ITEMS_IN_GROUP:
      temp = { ...state };
      temp[action.payload] = temp[action.payload].map((item) => {
        const tempItem = { ...item };
        tempItem.show = !item.show;
        return tempItem;
      });
      temp[action.payload] = [...temp[action.payload]];
      return temp;

    default:
      return state;
  }
}
