import { combineReducers } from "redux";
import UserDataReducer from "./UserDataReducer";
import GroupReducer from "./GroupReducer";
import ItemsReducer from "./ItemReducer";
import OptionsReducer from "./OptionsReducer";
import TimelineReducer from "./TimelineReducer";
import BookMarksReducer from "./BookMarksReducer.js";
import BookmarkManagerReducer from "./BookmarkManagerReducer.js";
import BookmarkTitleReducer from "./BookmarkTitleReducer";

export default combineReducers({
  UserData: UserDataReducer,
  Groups: GroupReducer,
  Items: ItemsReducer,
  Options: OptionsReducer,
  Timeline: TimelineReducer,
  Bookmarks: BookMarksReducer,
  BookMarksManager:BookmarkManagerReducer,
  BookMarkTitle: BookmarkTitleReducer
});
