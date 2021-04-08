export const SET_USER_DATA = 'SET_USER_DATA'

export const setUserData = (name, email, uid) => {
    return {
        type: SET_USER_DATA,
        name: name,
        email: email,
        uid: uid
    }
}