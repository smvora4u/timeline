export const TIMELINE_SET_TIMELINE = "TIMELINE_SET_TIMELINE";
export const TIMELINE_SET_GROUPS = "TIMELINE_SET_GROUPS";
export const TIMELINE_SET_ITEMS = "TIMELINE_SET_ITEMS";
export const TIMELINE_SET_OPTIONS = "TIMELINE_SET_OPTIONS";
export const TIMELINE_EMPTY_DATASETS = "TIMELINE_EMPTY_DATASETS";

export const setTimeline = () => {
  //payload={}
  return {
    type: TIMELINE_SET_TIMELINE,
    payload: {},
  };
};
export const setTimelineGroups = (payload) => {
  //payload={container:htmlelement}
  return {
    type: TIMELINE_SET_GROUPS,
    payload,
  };
};
export const setTimelineItems = (payload) => {
  //payload={container:htmlelement}
  return {
    type: TIMELINE_SET_ITEMS,
    payload,
  };
};

export const setTimelineOptions = (payload) => {
  //payload
  return {
    type: TIMELINE_SET_OPTIONS,
    payload,
  };
};

export const emptyTimelineDatasets = () => {
  return {
    type: TIMELINE_EMPTY_DATASETS,
    payload: {},
  };
};
