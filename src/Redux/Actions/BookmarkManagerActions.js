export const BOOKMARK_MANAGER_SHOW = 'BOOKMARK_MANAGER_SHOW'


export const setBookmarkManagerShow = (payload) => {
    return {
      type: BOOKMARK_MANAGER_SHOW,
      payload,
    };
  };