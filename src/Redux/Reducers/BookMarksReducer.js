import { v4 as uuid } from "uuid";
import {
  BOOKMARK_ADD_EVENT,
  BOOKMARK_DELETE_EVENT,
  BOOKMARK_ADD_CHAPTER,
  BOOKMARK_DELETE_CHAPTER,
  BOOKMARK_UPDATE_BOOKMARKS,
  BOOKMARK_RENAME_CHAPTER,
  BOOKMARK_RENAME_EVENT,
  BOOKMARK_HANDLE_DRAG,
  BOOKMARK_READY_TO_ADD,
} from "../Actions/BookmarksActions.js";

const initData = {
  events: {
    //"1": { id: "1", content: "Grand theft auto V" },
    //"2": { id: "2", content: "minecraft" },
    //"3": { id: "3", content: "red dead redemption" },
    //"4": { id: "4", content: "Fallout 3" },
    //"5": { id: "5", content: "call of duty black ops 2" },
    //"6": { id: "6", content: "the last of us" },
  },
  chapters: {
    //"chapter-1": {
    //  id: "chapter-1",
    //  title: "xbox one",
    //  eventIds: ["1", "2", "3", "4", "5", "6"],
    //},
    //"chapter-2": {
    //  id: "chapter-2",
    //  title: "ps4",
    //  eventIds: [],
    //},
    //"chapter-3": {
    //  id: "chapter-3",
    //  title: "ps3",
    //  eventIds: [],
    //},
  },
  chapterOrder: [],
  //chapterOrder: ["chapter-1", "chapter-2", "chapter-3"],
  readyToAdd: {},
};

export default function BookMarksReducer(state = initData, action) {
  let temp, temp1, result, source, sourceIndex, destination, destinationIndex;
  switch (action.type) {
    case BOOKMARK_ADD_EVENT:
      //payload:{id,title}
      //add to the events
      temp = { ...state };
      temp.events = { ...temp.events };
      temp.events[action.payload.id] = {
        id: action.payload.id,
        content: action.payload.title,
      };
      //add to the last chapter.
      temp1 = temp.chapterOrder && temp.chapterOrder.length > 0 ? temp.chapterOrder[temp.chapterOrder.length - 1] : null;
      if(temp1){
        temp.chapters = { ...temp.chapters };
        temp.chapters[temp1] = { ...temp.chapters[temp1] };
        temp.chapters[temp1].eventIds = [
          ...temp.chapters[temp1].eventIds,
          action.payload.id,
        ];
        return temp
      }
      
      //temp.chapters[temp1].eventIds.push(action.payload.id);
      return [];

    case BOOKMARK_DELETE_EVENT:
      //payload:{chapterId,id}
      temp = { ...state };
      console.log(action.payload.id, action.payload.chapterId);
      let tempEventIds = [...temp.chapters[action.payload.chapterId].eventIds];
      console.log(tempEventIds);
      tempEventIds = tempEventIds.filter(
        (eventId) => eventId !== action.payload.id
      );
      console.log(tempEventIds);
      temp.chapters[action.payload.chapterId].eventIds = tempEventIds;
      temp.chapters = { ...temp.chapters };
      temp.chapters[action.payload.chapterId] = {
        ...temp.chapters[action.payload.chapterId],
      };
      return temp;

    case BOOKMARK_ADD_CHAPTER:
      //payload={}
      //generate Id using uuid
      temp1 = uuid();
      //add to chapters
      temp = { ...state };
      temp.events = { ...state.events };
      temp.chapters = { ...state.chapters };
      temp.chapters[temp1] = { id: temp1, title: "New Chapter", eventIds: [] };
      //add to chapterOrder

      temp.chapterOrder = [...state.chapterOrder || [], temp1];
      //temp.chapterOrder.push(temp1);
      console.log("added", temp.chapters[temp1]);
      console.log(temp);
      return { ...temp };

    case BOOKMARK_DELETE_CHAPTER:
      //payload:{id}
      //delete from chapters
      temp = { ...state };
      temp.chapters = {};
      Object.keys(state.chapters)
        .filter((e) => e.id !== action.payload.id)
        .forEach((id) => {
          temp.chapters[id] = { ...state.chapters[id] };
          return id;
        });
      //delete from chapterOrder
      temp.chapterOrder = [...temp.chapterOrder || []];
      temp.chapterOrder = temp.chapterOrder.filter(
        (e) => e !== action.payload.id
      );
      return temp;

    case BOOKMARK_UPDATE_BOOKMARKS:
      //payload:{newBookmarkObject}
      temp = { ...action.payload };
      //firefox chapters fix
      if (!temp.chapters) {
        temp.chapters = {};
      }
      Object.keys(temp.chapters).forEach((chapter) => {
        if (!temp.chapters[chapter].eventIds) {
          temp.chapters[chapter].eventIds = [];
        }
        return chapter;
      });

      //firebase chaperOrder fix
      if (!temp.chaptersOrder) {
        temp.chaptersOrder = [];
      }
      //firebase eventsfix
      if (!temp.events) {
        temp.events = {};
      }
      console.log(temp);
      return action.payload;

    case BOOKMARK_RENAME_EVENT:
      //payload:{id,content}
      //change the events item
      temp = { ...state };
      temp.events = { ...temp.events };
      temp.events[action.payload.id] = { ...temp.events[action.payload.id] };
      temp.events[action.payload.id].content = action.payload.content;
      return temp;

    case BOOKMARK_RENAME_CHAPTER:
      //payload:{id,title}
      //chapter the chapter item in chapters
      temp = { ...state };
      temp.chapters = { ...temp.chapters };
      temp.chapters[action.payload.id] = {
        ...temp.chapters[action.payload.id],
      };
      temp.chapters[action.payload.id].title = action.payload.title;
      return temp;

    case BOOKMARK_HANDLE_DRAG:
      //payload: drag result;
      result = action.payload;
      //console.log(result);
      if (result.destination) {
        temp = { ...state };
        temp.chapters = { ...temp.chapters };
        source = result.source.droppableId;
        sourceIndex = result.source.index;
        destination = result.destination.droppableId;
        destinationIndex = result.destination.index;
        if (result.type === "chapter") {
          //modify source
          temp.chapterOrder.splice(sourceIndex, 1);
          //modify destination
          temp.chapterOrder.splice(destinationIndex, 0, result.draggableId);
        } else {
          //modify source
          temp.chapters[source].eventIds.splice(sourceIndex, 1);
          //modify destination
          temp.chapters[destination].eventIds.splice(
            destinationIndex,
            0,
            result.draggableId
          );
        }
      }
      return temp;
    case BOOKMARK_READY_TO_ADD:
      temp = { ...state };
      temp.readyToAdd = action.payload;
      return temp;
    default:
      return state;
  }
}
