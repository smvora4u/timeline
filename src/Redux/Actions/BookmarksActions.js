//individual entries in the bookmark manager
//are called events and they are grouped together as chapters.

export const BOOKMARK_ADD_EVENT = "BOOKMARK_ADD_EVENT";
export const BOOKMARK_DELETE_EVENT = "BOOKMARK_DELETE_EVENT";
export const BOOKMARK_ADD_CHAPTER = "BOOKMARK_ADD_CHAPTER";
export const BOOKMARK_DELETE_CHAPTER = "BOOKMARK_DELETE_CHAPTER";
export const BOOKMARK_UPDATE_BOOKMARKS = "BOOKMARK_UPDATE_BOOKMARKS";
export const BOOKMARK_RENAME_CHAPTER = "BOOKMARK_RENAME_CHAPTER";
export const BOOKMARK_RENAME_EVENT = "BOOKMARK_RENAME_EVENT";
export const BOOKMARK_HANDLE_DRAG = "BOOKMARK_HANDLE_DRAG";
export const BOOKMARK_READY_TO_ADD = "BOOKMARK_READY_TO_ADD";

export const addEvent = (item) => {
  return {
    type: BOOKMARK_ADD_EVENT,
    payload: item,
  };
};
export const deleteEvent = (payload) => {
  return {
    type: BOOKMARK_DELETE_EVENT,
    payload,
  };
};
export const addChapter = () => {
  return {
    type: BOOKMARK_ADD_CHAPTER,
    payload: {},
  };
};
export const deleteChapter = (payload) => {
  return {
    type: BOOKMARK_DELETE_CHAPTER,
    payload,
  };
};
export const updateBookmarks = (payload) => {
  return {
    type: BOOKMARK_UPDATE_BOOKMARKS,
    payload,
  };
};
export const renameChapter = (payload) => {
  return {
    type: BOOKMARK_RENAME_CHAPTER,
    payload,
  };
};
export const renameEvent = (payload) => {
  return {
    type: BOOKMARK_RENAME_EVENT,
    payload,
  };
};
export const handleDrag = (payload) => {
  return {
    type: BOOKMARK_HANDLE_DRAG,
    payload,
  };
};
export const bookmarkReadyToAdd = (payload) => {
  return {
    type: BOOKMARK_READY_TO_ADD,
    payload,
  };
};
