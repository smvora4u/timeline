import firebase from "firebase/app";
require('@firebase/storage')


export const uploadImage = async (uri, FOLDER_PATH, IMAGE_NAME, mime = 'application/octet-stream') => {
    if (!uri) return

    return new Promise((resolve, reject) => {
        const imageRef = firebase.storage().ref(FOLDER_PATH).child(IMAGE_NAME)
        imageRef.put(uri, { contentType: mime })
            .then(() => {
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                console.log("Image upload error: ", error)
                reject(null)
            })
    })
}