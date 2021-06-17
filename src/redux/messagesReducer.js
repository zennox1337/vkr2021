const SEND_AUDIO_MESSAGE = 'MESSAGES/SEND_AUDIO_MESSAGE'
const SET_IMG_PREVIEW = 'MESSAGES/SET_IMG_PREVIEW'
const SET_AUDIO_MESSAGE = 'MESSAGES/SET_AUDIO_MESSAGE'
const SET_IMG_FILE = 'MESSAGES/SET_IMG_FILE';
const REMOVE_IMAGE = 'MESSAGES/REMOVE_IMAGE'
const SET_CURRENT_TEXT = 'MESSAGETEXTAREA/SET_CURRENT_TEXT'
const SUBMIT_TEXT_MESSAGE = 'MESSAGETEXTAREA/SUBMIT_TEXT_MESSAGE'
const SEND_LOADING = 'MESSAGETEXTAREA/SEND_LOADING'
const SET_LIMIT_MESSAGES = 'MESSAGES/SET_LIMIT_MESSAGES'

let initialState = {
    previewImg: null,
    audioRecording: false,
    imgFile: null,
    removeImage: false,
    textMessage: '',
    submitTextMessage: false,
    sendLoading: false,
    limitMessages: 10
}


const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMG_PREVIEW:
            return {
                ...state,
                previewImg: action.previewImg
            }
        case SET_AUDIO_MESSAGE:
            return {
                ...state,
                audioRecording: action.audioRecording
            }
        case SET_IMG_FILE:
            return {
                ...state,
                imgFile: action.imgFile
            }
        case REMOVE_IMAGE:
            return {
                ...state,
                removeImage: action.removeImage
            }
        case SET_CURRENT_TEXT:
            return {
                ...state,
                textMessage: action.textMessage
            }
        case SUBMIT_TEXT_MESSAGE:
            return {
                ...state,
                submitTextMessage: action.submitTextMessage
            }
        case SEND_LOADING:
            return {
                ...state,
                sendLoading: action.sendLoading
            }
        case SET_LIMIT_MESSAGES:
            return {
                ...state,
                limitMessages: action.limitMessages
            }
        default:
            return state
    }
}

export const setLimitMessages = (limitMessages) => {
    return {
        type: SET_LIMIT_MESSAGES,
        limitMessages
    }
}

export const setSendLoadingAC = (sendLoading) => {
    return {
        type: SEND_LOADING,
        sendLoading
    }
}

export const setCurrentTextMessageAC = (textMessage) => {
        return {
            type: SET_CURRENT_TEXT,
            textMessage
        }
    }
    //создали отслеживание submit для очистки поля
    //так как поле и кнопка находятся в разных местах
export const submitTextMessageAC = (submitTextMessage) => {
    return {
        type: SUBMIT_TEXT_MESSAGE,
        submitTextMessage
    }
}

export const sendAudioMessageAC = (message) => {
    return {
        type: SEND_AUDIO_MESSAGE,
        message
    }
}

export const deleteMessageTC = (messageId, dialogId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection(`dialogs/${dialogId}/messages`).doc(messageId).delete().then((response) => {
            console.log('Удалено сообщение с id:', messageId)
        }).catch((err) => {
            console.log('MessageDeleteERR', err)
        })
    }
}


export const sendAudioMessageTC = (file, myId, dialogId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const sendLoading = getState().sendMessages.sendLoading
        if (!sendLoading) {
            dispatch(setSendLoadingAC(true));
            const firebase = getFirebase();
            const storageRef = firebase.storage().ref()
            const generateName = Date.now() + myId;
            const fileRef = storageRef.child(`dialogs/${generateName}.webm`)
            return fileRef.put(file).then((response) => {
                console.log('отправка произошла, вот путь:', response.metadata.fullPath)
                const message = {
                    body: response.metadata.fullPath,
                    createdAt: new Date(),
                    uid: myId,
                    messageType: 'audio'
                }
                dispatch(sendMessageTC(message, dialogId))
            }).catch((err) => {
                dispatch(setSendLoadingAC(false));
            })
        }
    }
}
export const sendImageMessageTC = (file, myId, dialogId, title = '') => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const sendLoading = getState().sendMessages.sendLoading
        if (!sendLoading) {
            dispatch(setSendLoadingAC(true));
            const firebase = getFirebase();
            const storageRef = firebase.storage().ref()
            const generateName = Date.now() + myId + 'image';
            const fileRef = storageRef.child(`dialogs/${generateName}`)
            return fileRef.put(file).then((response) => {
                console.log('отправка произошла, вот путь:', response.metadata.fullPath)
                const message = {
                    body: response.metadata.fullPath,
                    createdAt: new Date(),
                    uid: myId,
                    messageType: 'img',
                    title: title
                }
                dispatch(sendMessageTC(message, dialogId));
                dispatch(setImagePreviewUrlAC(null));
                dispatch(setImageFileAC(null))
            }).catch((err) => {
                dispatch(setSendLoadingAC(false));
            })
        } else {
            alert('!!!')
        }
    }
}

export const sendMessageTC = (message, dialogId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(setSendLoadingAC(true));
        dispatch(submitTextMessageAC(true));
        const firestore = getFirestore();
        firestore.collection(`dialogs/${dialogId}/messages`).add({
            ...message
        }).then((resp) => {
            dispatch(setLastMessageTC(message, dialogId));
            dispatch(submitTextMessageAC(false));
            dispatch(setSendLoadingAC(false));
        }).catch((err) => {
            console.log(err)
            dispatch(submitTextMessageAC(false));
            dispatch(setSendLoadingAC(false));
        })
    }
}
export const setLastMessageTC = (message, dialogId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let lastMessage;
        if (message.messageType === 'img') {
            lastMessage = 'изображение'
        } else if (message.messageType === 'audio') {
            lastMessage = 'голосовое сообщение'
        } else {
            lastMessage = message.body
        }
        firestore.collection(`dialogs/`).doc(dialogId).update({
            lastMessage: lastMessage
        }).then((resp) => {}).catch((err) => {
            console.log(err)
        })
    }
}

//form events!
export const setImagePreviewUrlAC = (previewImg) => {
    return {
        type: SET_IMG_PREVIEW,
        previewImg
    }
}
export const setImageFileAC = (imgFile) => {
    return {
        type: SET_IMG_FILE,
        imgFile
    }
}
export const removeImageAC = (removeImage) => {
    return {
        type: REMOVE_IMAGE,
        removeImage
    }
}
export const setAudioMessageAC = (audioRecording) => {
        return {
            type: SET_AUDIO_MESSAGE,
            audioRecording
        }
    }
    //

export default messagesReducer;