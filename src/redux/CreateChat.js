const SET_ERRORS = 'CREATECHAT/SET_ERRORS'
const SUBMIT_DISABLED = 'CREATECHAT/SUBMIT_DISABLED'
const CHANGE_VISIBLE = 'CREATE/CHANGE_VISIBLE';
let initialState = {
    errors: undefined,
    submitDisabled: true,
    visibleModal: false
}


const createChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            }
        case SUBMIT_DISABLED:
            return {
                ...state,
                submitDisabled: action.submitDisabled
            }
        case CHANGE_VISIBLE:
            return {
                ...state,
                visibleModal: action.visibleModal
            }
        default:
            return state
    }


}

export const setErrorsCreateChat = (errors) => {
    return {
        type: SET_ERRORS,
        errors
    }
}
export const setSubmitDisabledToggle = (submitDisabled) => {
    return {
        type: SUBMIT_DISABLED,
        submitDisabled
    }
}
export const changeVisibleModal = (visibleModal) => {
    return {
        type: CHANGE_VISIBLE,
        visibleModal
    }
}

export const checkDuplicateAndCreateRoom = (userId, roomsArray) => {
    return (dispatch, getState) => {
        const myId = getState().firebase.auth.uid
        if (roomsArray && myId) {
            if (userId && userId.length >= 2) {
                if (userId !== myId) {
                    let result = roomsArray.filter((room, index) => {
                        return room.creator === userId || room.invited === userId
                    })
                    if (result.length === 0) {
                        dispatch(createChatRoom(myId, userId));
                        dispatch(changeVisibleModal(false));
                    } else {
                        dispatch(setErrorsCreateChat('У вас уже есть чат с этим пользователем!'));
                        setTimeout(() => {
                            dispatch(setErrorsCreateChat(undefined))
                        }, 5000)
                    }
                } else {
                    dispatch(setErrorsCreateChat('Вы не можете создать диалог с самим собой!'));
                    setTimeout(() => {
                        dispatch(setErrorsCreateChat(undefined))
                    }, 5000)
                }
            }

        }
    }
}

export const createChatRoom = (myId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('dialogs').add({
            Users: 0,
            creator: myId,
            invited: userId,
            lastMessage: ''
        }).then((resp) => {
            firestore.collection(`dialogs/${resp.id}/messages`).add({})
        })
    }
}

export default createChatReducer;