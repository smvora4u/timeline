export const SET_ITEMS_DATA = "SET_ITEMS_DATA";
export const SET_DEFAULT_PROPERTIES_FOR_ALL_ITEMS =
  "SET_DEFAULT_PROPERITES_FOR_ALL_ITEMS";
export const TOGGLE_ITEMS_IN_GROUP = "TOGGLE_ITEMS_IN_GROUP";

export const setItemsData = (items) => {
  return {
    type: SET_ITEMS_DATA,
    payload: items,
  };
};
export const setDefaultPropertiesForAllItems = () => {
  return {
    type: SET_DEFAULT_PROPERTIES_FOR_ALL_ITEMS,
  };
};

export const toggleItemsInGroup = (id) => {
  return {
    type: TOGGLE_ITEMS_IN_GROUP,
    payload: id,
  };
};
