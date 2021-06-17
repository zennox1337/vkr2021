const SET_USER_IMAGE = 'ME/SET_USER_IMAGE'

let initialState = {

}


const meReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_IMAGE:
            return {
                ...state

            }
        default:
            return state
    }
}

export const setUserImageTC = (file, myId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storageRef = firebase.storage().ref()
        const generateName = Date.now() + myId + 'avatar';
        const fileRef = storageRef.child(`usersAvatar/${generateName}`)
        return fileRef.put(file).then((response) => {
            console.log('отправка произошла, вот путь:', response.metadata.fullPath)
            firestore.collection('users').doc(myId).update({
                photoURL: response.metadata.fullPath
            })

        }).catch((err) => {

        })
    }
}

export default meReducer