import { FormatColorReset } from "@material-ui/icons";
import { BOOKMARK_MANAGER_SHOW } from "../Actions/BookmarkManagerActions";
//import { groups } from "./dummydata.js";

const initState = {
    bookmarkShow:false
};

export default function BookmarkManagerReducer(state = initState, actions) {
  switch (actions.type) {
    
    case BOOKMARK_MANAGER_SHOW:
      return {
          ...state,
        bookmarkShow: actions.payload
      }
      // return state;
    default:
      return state;
  }
}
