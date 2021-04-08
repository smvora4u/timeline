import { SET_USER_DATA } from "../Actions/UserData";

const initState = {
    name: '',
    email: '',
    uid: ''
}

export default function UserDataReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_USER_DATA:
            return {
                ...state,
                name: actions.name,
                email: actions.email,
                uid: actions.uid
            }
        default:
            return state
    }
}