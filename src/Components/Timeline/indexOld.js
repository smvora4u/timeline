import React from "react";
import ReactDOM from "react-dom";
import { Timeline, DataSet } from "vis-timeline/standalone";

import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import GroupTemplate from "./Groups/GroupTemplate";
import ItemTemplate from "./Items/ItemTemplate";
import EventItem from "./Items/EventItem.js";

import {
  setGroups,
  setItems,
  //setTimeline,
  getTimeline,
  getGroups,
} from "./Options";
import TimelineSlider from "./YearSlider";
import Controls from "./Controls/Controls.js";

import {
  setDefaultPropertiesForAllItems,
  toggleItemsInGroup,
} from "../../Redux/Actions/ItemActions.js";

import {
  setTimeline,
  setTimelineOptions,
  setTimelineGroups,
  setTimelineItems,
} from "../../Redux/Actions/TimelineActions.js";

// import "../../Styles/Main.css";
//import "./Timeline.css";
// import "./Items/Item.css";
// class VisibleFrameTemplate extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <div style={{ backgroundColor: 'orange' }}>
//             id: {this.props.item.id}
//             <button onClick={() => { return console.log('aaaaaa') }}>aaaa</button>
//         </div>
//     }
// }

const updateItems = (groupsData, itemsData, itemsDataSet) => {
  groupsData.forEach((element) => {
    const group_id = element["timeline_id"];
    const items = itemsData[group_id];
    items.forEach((item) => {
      const start_date = Date.parse(item["start_date"]);
      const end_date = Date.parse(item["end_date"]);
      if (start_date) {
        itemsDataSet.add({
          id: item["id"],
          group: group_id,
          start: new Date(start_date),
          end: new Date(end_date),
          description: item["description"],
          //content: JSON.stringify(item),
          title: item["title"],
          type: "box",
          starRating: item["starRating"],
          tags: item["tags"],
          imgURL: item["imgURL"],
          videoURL: item["videoURL"],
          audioURL: item["audioURL"],
          content: item["content"],
        });
      }
    });
  });
};
const updateGroups = (groupsData, groupsDataSet) => {
  groupsData.forEach((element) => {
    groupsDataSet.add({
      order: element["timeline_id"],
      id: element["timeline_id"],
      imgURL: element["imgURL"],
      content: JSON.stringify(element),
      title: element["title"],
    });
  });
};

const fetchOptions = (
  timeline,
  groupDataSet,
  itemsDataSet,
  groupsData,
  itemsData,
  dispatch,
  toggleItemsInGroup
) => {
  return {
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
    start: Date.now() - 1000 * 60 * 60 * 24 * 3, // minus 3 days
    end: Date.now() + 1000 * 60 * 60 * 24 * 21, // plus 1 months aprox.
    onInitialDrawComplete: () => {
      //timeline.setItems(items)
      timeline.redraw();
      //timeline.fit();
    },
    template: function (item, element) {
      if (!item) {
        return;
      }
      return ReactDOM.createPortal(
        ReactDOM.render(
          <EventItem item={item} itemDataSet={itemsDataSet} />,
          element
        ),
        element,
        () => {
          timeline.redraw();
        }
      );
    },

    groupTemplate: function (group, element) {
      if (!group || !group.content) {
        return;
      }
      return ReactDOM.createPortal(
        ReactDOM.render(
          <GroupTemplate
            dispatch={dispatch}
            group={group}
            groupsDataSet={groupsDataSet}
            itemsDataSet={itemsDataSet}
            toggleItemsInGroup={toggleItemsInGroup}
            groupsData={groupsData}
            itemsData={itemsData}
          />,
          element
        ),
        element
      );
    },

    // visibleFrameTemplate: function (item, element) {
    //     if (!item || !element) { return }
    //     if (element.className.indexOf('timeline-item-visible-frame') === -1) { return }
    //     return ReactDOM.createPortal( ReactDOM.render( <VisibleFrameTemplate item={item} />, element ), element );

    // },
  };
};
//let container;
//let timeline;
//let groupsDataSet = new DataSet();
//let itemsDataSet = new DataSet();
export default function App() {
  const groupsData = useSelector((state) => state.Groups);
  const itemsData = useSelector((state) => state.Items);
  const bookmarksData = useSelector((state) => state.BookMarks);
  const timeline = useSelector((state) => state.Timeline.timeline);

  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);
  const [first, setFirst] = React.useState(false);

  React.useEffect(() => {
    //container = document.getElementById("visualization");
    //timeline = new Timeline(container);
    dispatch(setTimeline());
    dispatch(setTimelineOptions());
    dispatch(setTimelineGroups({ groupsData: groupsData }));
    dispatch(setTimelineItems({ itemsData, groupsData }));

    //const options = fetchOptions(
    //  timeline,
    //  groupsDataSet,
    //  itemsDataSet,
    //  dispatch,
    //  toggleItemsInGroup
    //);
    //timeline.setOptions(options);
    //timeline.setGroups(groupsDataSet);
    //timeline.setItems(itemsDataSet);
    //setTimeline(timeline);
    //setGroups(groupsDataSet);
    //setItems(itemsDataSet);
  }, [dispatch, groupsData, itemsData]);

  React.useEffect(() => {
    setLoading(true);
    //const defaultValuesSet =
    //  itemsData[Object.keys(itemsData)[0]][0].show !== undefined;
    //if (defaultValuesSet && !first) {
    if (!first) {
      //updateItems(groupsData, itemsData, itemsDataSet);
      //updateGroups(groupsData, groupsDataSet);
      //setFirst(true);
      //setLoading(false);
      //} else if (!defaultValuesSet && !first) {
    } else if (!first) {
      //dispatch(setDefaultPropertiesForAllItems());
    }
  }, [dispatch, first, groupsData, itemsData]);

  return (
    <>
      {!isLoading && false && (
        <TimelineSlider timeline={getTimeline()} groups={getGroups()} />
      )}
      <Grid
        item
        lg="12"
        xs="12"
        id="visualization"
        style={{ marginLeft: "20px", resize: "vertical" }}
      >
        {/*
        <Controls
          timeline={timeline}
          itemsData={itemsData}
          itemsDataSet={itemsDataSet}
          bookmarks={bookmarksData}
        />
		  */}
      </Grid>
      <Grid item lg="12" xs="12"></Grid>
    </>
  );
}
