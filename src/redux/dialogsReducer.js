const SET_FILTERED_DIALOGS = 'DIALOGS/SET_FILTERED_DIALOGS'
const SET_CURRENT_ROOMID = 'DIALOGS/SET_CURRENT_ROOMID'
const SET_SEARCH_DIALOGS = 'DIALOGS/SET_SEARCH_DIALOGS'
const SET_CURRENT_CHAT_USERS_INFO_USER = 'DIALOGS/SET_CURRENT_CHAT_USERS_INFO_USER'
const SET_CURRENT_CHAT_USERS_INFO_MY = 'DIALOGS/SET_CURRENT_CHAT_USERS_INFO_MY'
const LOADING_DATA_USERS_CHAT = 'LOADING_DATA_USERS_CHAT'
let initialState = {
    filteredDialogs: [],
    roomId: '',
    searchDialogs: [],
    currentChatUsersInfo: [],
    loadingData: false
}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERED_DIALOGS:
            return {
                ...state,
                filteredDialogs: action.filteredDialogs
            }
        case SET_CURRENT_ROOMID:
            return {
                ...state,
                roomId: action.roomId
            }
        case SET_SEARCH_DIALOGS:
            return {
                ...state,
                searchDialogs: action.searchDialogs
            }
        case SET_CURRENT_CHAT_USERS_INFO_USER:
            return {
                ...state,
                currentChatUsersInfo: {...state.currentChatUsersInfo,
                    userInfo: action.userInfo
                }
            }
        case SET_CURRENT_CHAT_USERS_INFO_MY:
            return {
                ...state,
                currentChatUsersInfo: {...state.currentChatUsersInfo,
                    myinfo: action.myinfo
                }
            }
        case LOADING_DATA_USERS_CHAT:
            return {
                ...state,
                loadingData: action.loadingData
            }
        default:
            return state
    }
}

export const loadingDataToggleAC = (loadingData) => {
    return {
        type: LOADING_DATA_USERS_CHAT,
        loadingData
    }
}

export const setCurrentChatUsersInfoUser = (userInfo) => {
    return {
        type: SET_CURRENT_CHAT_USERS_INFO_USER,
        userInfo
    }
}
export const setCurrentChatUInfoUserTC = (userInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //проверяем есть или нет, так как делаем очистку
        if (userInfo) {
            dispatch(loadingDataToggleAC(true));
            const firebase = getFirebase();
            if (userInfo.photoURL !== '') {
                const storageRef = firebase.storage().ref()
                storageRef.child(userInfo.photoURL).getDownloadURL().then((resp) => {
                    let result = {
                        ...userInfo,
                        avatarLink: resp
                    }
                    dispatch(setCurrentChatUsersInfoUser(result))
                    dispatch(loadingDataToggleAC(false));
                })
            } else {
                let result = {
                    ...userInfo,
                    avatarLink: ''
                }
                dispatch(setCurrentChatUsersInfoUser(result))
                setTimeout(() => {
                    dispatch(loadingDataToggleAC(false));
                }, 1500)
            }
        }
    }
}
export const setCurrentChatUsersMyInfo = (myinfo) => {
    return {
        type: SET_CURRENT_CHAT_USERS_INFO_MY,
        myinfo
    }
}
export const setCurrentChatUInfoMyInfoTC = (myInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        if (myInfo.photoURL !== '') {
            const storageRef = firebase.storage().ref()
            storageRef.child(myInfo.photoURL).getDownloadURL().then((resp) => {
                let result = {
                    ...myInfo,
                    avatarLink: resp
                }
                dispatch(setCurrentChatUsersMyInfo(result))
            }).catch((err) => {

            })
        } else {
            let result = {
                ...myInfo,
                avatarLink: ''
            }
            dispatch(setCurrentChatUsersMyInfo(result));
        }
    }
}

export const setSearchDialogsAC = (searchDialogs) => {
    return {
        type: SET_SEARCH_DIALOGS,
        searchDialogs
    }
}
export const setFilteredDialogsAC = (filteredDialogs) => {
    return {
        type: SET_FILTERED_DIALOGS,
        filteredDialogs
    }
}
export const setCurrentRoomId = (roomId) => {
    return {
        type: SET_CURRENT_ROOMID,
        roomId
    }
}


export default dialogsReducer