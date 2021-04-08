export const SET_GROUP_DATA = "SET_GROUP_DATA";
export const SET_GROUP_COLOR = "SET_GROUP_COLOR";
export const setGroupsData = (groups) => {
  return {
    type: SET_GROUP_DATA,
    groups: groups,
  };
};
export const setGroupColor = (payload) => {
  //payload:{id,color}
  return {
    type: SET_GROUP_COLOR,
    payload,
  };
};
