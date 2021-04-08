import React from "react";
import { Provider } from "react-redux";
import Store from "../Store.js";
import {
  TIMELINE_SET_TIMELINE,
  TIMELINE_SET_GROUPS,
  TIMELINE_SET_ITEMS,
  TIMELINE_SET_OPTIONS,
  TIMELINE_EMPTY_DATASETS,
} from "../Actions/TimelineActions.js";
import { Timeline, DataSet } from "vis-timeline/standalone";
import ReactDOM from "react-dom";
import "../../Components/Timeline/Timeline.css";
import GroupTemplateN from "../../Components/Timeline/Groups/GroupTemplateN.js";
import EventItemN from "../../Components/Timeline/Items/EventItemN.js";

const initState = {
  timeline: {},
  groupsDataSet: new DataSet(),
  itemsDataSet: new DataSet(),
};
//attention normally state is an independent object
//since we are using timeline library,
//the state here mutates
export default function TimelineReducer(state = initState, action) {
  let temp = {};
  let items, groups;
  switch (action.type) {
    //creates time line
    case TIMELINE_SET_TIMELINE:
      state.timeline = new Timeline(document.getElementById("visualization"));
      return state;

    //sets options for timelin
    case TIMELINE_SET_OPTIONS:
      temp = {
        margin: {
          item: 10,
          axis: 10,
        },
        verticalScroll: true,
        groupHeightMode: "auto",
        orientation: "top",
        height: "82vh",
        editable: false,
        groupEditable: true,
        multiselect: false,
        moveable: true,
        zoomable: true,
        zoomFriction: 4,
        zoomKey: "ctrlKey",
        start: Date.now() - 1000 * 60 * 60 * 24 * 3, // minus 3 days
        end: Date.now() + 1000 * 60 * 60 * 24 * 21, // plus 1 months aprox.
        onInitialDrawComplete: () => {
          //timeline.setItems(items)
          state.timeline.redraw();
          //timeline.fit();
        },
        template: function (item, element) {
          if (!item) {
            return;
          }
          return ReactDOM.createPortal(
            ReactDOM.render(
              <Provider store={Store}>
                <EventItemN item={item} />
              </Provider>,
              element
            ),
            element,
            () => {
              state.timeline.redraw();
            }
          );
        },

        groupTemplate: function (group, element) {
          if (!group) {
            return;
          }
          return ReactDOM.createPortal(
            ReactDOM.render(
              <Provider store={Store}>
                <GroupTemplateN group={group} />
              </Provider>,
              element
            ),
            element
          );
        },
      };
      state.timeline.setOptions(temp);
      return state;

    case TIMELINE_SET_GROUPS:
      action.payload.groupsData.forEach((element) => {

        state.groupsDataSet.add({
          order: element["timeline_id"],
          id: element["timeline_id"],
          imageURL: element["imageURL"],
          content: element["content"],
          title: element["title"],
          color: element["color"],
        });


      });
      state.timeline.setGroups(state.groupsDataSet);
      return state;

    case TIMELINE_SET_ITEMS:
      action.payload.groupsData.forEach((element) => {
        const group_id = element["timeline_id"];
        const group_img = element["imageURL"];
        const profile_Tag_URL = element["profileTagURL"];
        const color = element["color"];
        const items = action.payload.itemsData[group_id];
        //console.log("items", group_id, action.payload.itemsData);
        if (items) {
          items.forEach((item) => {
             console.log(item);
            const start_date = Date.parse(item["start_date"]);
            const end_date = Date.parse(item["end_date"]);
            console.log("raw item", item);
            if (start_date) {
              state.itemsDataSet.add({
                id: item["id"],
                groupImg: group_img,
                group: group_id,
                start: new Date(start_date),
                end: new Date(end_date),
                description: item["description"],
                //content: JSON.stringify(item),
                title: item["title"],
                type: "box",
                starRating: item["starRating"],
                tags: item["tags"],
                imgURL: item["ebPicURL"],
                videoURL: item["mVideoURL"],
                audioURL: item["mAudioURL"],
                mapsURL: item["mMapsURL"],
                content: item["content"],
                color,
                otherImages: item["mPicURL"],
                profileTagURL: item["profileTagURL"],
              });
            }
          });
        }
      });
      state.timeline.setItems(state.itemsDataSet);
      return state;
    case TIMELINE_EMPTY_DATASETS:
      //console.log(state.itemsDataSet);
      if (state.itemsDataSet.length !== 0) {
        items = state.itemsDataSet.get({ filter: (item) => true });
        groups = state.groupsDataSet.get({ filter: (group) => true });
        ////console.log("empty", items, groups);
        items.forEach((item) => {
          state.itemsDataSet.remove(item.id);
        });
        groups.forEach((group) => {
          state.groupsDataSet.remove(group.id);
        });
      }
      return state;
    default:
      return state;
  }
}
