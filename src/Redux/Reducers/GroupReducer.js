import { SET_GROUP_DATA, SET_GROUP_COLOR } from "../Actions/GroupActions";
//import { groups } from "./dummydata.js";

const initState = [];

export default function GroupsReducer(state = initState, actions) {
  let temp = [];
  switch (actions.type) {
    case SET_GROUP_DATA:
      return actions.groups;

    case SET_GROUP_COLOR:
      temp = [...state];
      for (let i = 0; i < temp.length; i++) {
        if (actions.payload.id === temp[i].timeline_id) {
          temp[i] = { ...temp[i] };
          temp[i].color = actions.payload.color;
        }
      }
      return temp;
    default:
      return state;
  }
}
