import { SET_BOOKMARKTITLE } from "../Actions/BookmarkTitleActions"

const initState = {}

export default function BookmarkTitleReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_BOOKMARKTITLE:
            return actions.options
        default:
            return state
    }
}