import firebase from 'firebase'
import { AppStateType } from './store'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ExtendedFirebaseInstance, ExtendedAuthInstance, ExtendedStorageInstance, ExtendedFirestoreInstance } from 'react-redux-firebase'


const IS_LOADED = 'IS_LOADED'
const SET_ERRORS_SIGN_IN = 'SET_ERRORS'
const SET_ERRORS_SIGN_UP = 'SET_ERRORS_SIGN_UP'

let initialState = {
    isLoaded: false,
    errors: {
        errorsSignIn: [] as [] | ErrorType,
        errorsSignUp: [] as [] | ErrorType
    }
}
type ErrorType = {
    a: string | null
    code: string
    message: string
} | []

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case IS_LOADED:
            {
                return {
                    ...state,
                    isLoaded: action.load
                }
            }
        case SET_ERRORS_SIGN_IN:
            {
                return {
                    ...state,
                    errors: { ...state.errors, errorsSignIn: action.err }
                }
            }
        case SET_ERRORS_SIGN_UP:
            {
                return {
                    ...state,
                    errors: { ...state.errors, errorsSignUp: action.err }
                }
            }
        default:
            return state
    }
}


type ActionsType = SetErrorsSignUpACType | ToggleLoadingACType | SetErrorsSignInACType
//actions creator
type ToggleLoadingACType = {
    type: typeof IS_LOADED,
    load: boolean
}

const toggleLoadingAC = (load: boolean): ToggleLoadingACType => {
    return {
        type: IS_LOADED,
        load
    }
}
type SetErrorsSignInACType = {
    type: typeof SET_ERRORS_SIGN_IN,
    err: ErrorType
}
const setErrorsSignInAC = (err: ErrorType): SetErrorsSignInACType => {
    return {
        type: SET_ERRORS_SIGN_IN,
        err
    }
}
type SetErrorsSignUpACType = {
    type: typeof SET_ERRORS_SIGN_UP,
    err: ErrorType
}
export const setErrorsSignUpAC = (err: ErrorType): SetErrorsSignUpACType => {
    return {
        type: SET_ERRORS_SIGN_UP,
        err
    }
}
//thunks 
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type GetFirebaseType = ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


export const authThunkCreator = (credentials: any): ThunkActionType => {
    return (dispatch) => {
        dispatch(toggleLoadingAC(true));
        return firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((response) => {
            console.log('Auth success')
            dispatch(toggleLoadingAC(false))
        }).catch((err) => {
            debugger
            console.log('Some errors in auth')
            dispatch(toggleLoadingAC(false))
            dispatch(setErrorsSignInAC(err))
            setTimeout(() => {
                dispatch(setErrorsSignInAC([]))
            }, 5000)
        })
    }
}
export const signOutThunkCreator = () => (dispatch: DispatchType) => {
    firebase.auth().signOut().then(() => {
        console.log('Sign out Success')
    }).catch(() => {
        console.log('Sign out Errors')
    })
}

type NewUserType = {
    email: string
    password: string
    firstName: string
}

type OptionsThunkFirebase = {
    getFirebase: GetFirebaseType,
    getFirestore: () => ExtendedFirestoreInstance
}
export const signUpThunkCreator = (newUser: NewUserType) => {
    return (dispatch: DispatchType,
        getState: GetStateType,
        { getFirebase, getFirestore }: OptionsThunkFirebase) => {
        dispatch(toggleLoadingAC(true));
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((response) => {
            if (response.user) {
                firestore.collection('users').doc(response.user.uid).set({
                    firstName: newUser.firstName,
                    photoURL: '',
                    createdAt: new Date(),
                    email: newUser.email
                })
            }
            //firestore.collection('dialogs').doc(response.user.uid).set({})
        }).then((response) => {
            dispatch(toggleLoadingAC(false));
        }).catch((err) => {
            dispatch(setErrorsSignUpAC(err))
            dispatch(toggleLoadingAC(false));
            setTimeout(() => {
                dispatch(setErrorsSignUpAC([]))
            }, 5000)
        })
    }
}





export default authReducer