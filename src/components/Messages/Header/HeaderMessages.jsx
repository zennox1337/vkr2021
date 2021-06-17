import React, { useEffect } from 'react'
import CurrentUser from '../CurrentUser/CurrentUser'
import { Col } from 'antd'
import './HeaderMessages.scss'
import { connect } from 'react-redux';
import { useFirebaseConnect, useFirestoreConnect } from 'react-redux-firebase';
import { setCurrentChatUInfoUserTC, setCurrentChatUInfoMyInfoTC } from './../../../redux/dialogsReducer';

const currentDialogUser = 'currentDialogUserInfo'

const HeaderMessages = (props) => {
    useFirebaseConnect('presence');
    const userId = props.dialog[0].creator !== props.myId ?
        props.dialog[0].creator :
        props.dialog[0].invited
    //ниже идет код который определяет текущих пользователей в чате
    //------------------------------------------------------------

    //беерем текущего пользователя из коллекции users
    useFirestoreConnect([
        {
            collection: 'users', doc: userId,
            storeAs: currentDialogUser
        }
    ])
    //добавляем в наш BLL, также в санке берем ссылку на его изображение
    useEffect(() => {
        if (props.currentDialogUserInfo) {
            props.currentDialogUserInfo[0] &&
                props.setCurrentChatUInfoUserTC(props.currentDialogUserInfo[0])
        }
        //очистка 
        return () => {
            props.setCurrentChatUInfoUserTC(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentDialogUserInfo])
    //добавляем информацию о себя
    useEffect(() => {
        if (props.profile.isLoaded) {
            props.setCurrentChatUInfoMyInfoTC(props.profile)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.profile.isLoaded])
    //все это будет храниться в одном массиве текущего чата с 
    //информацией обо мне и пользователе

    //------------------------------------------------------------
    return (
        <>
            <Col>
                <CurrentUser
                    usersOnline={props.usersOnline}
                    userInfo={props.currentChatUsersInfo.userInfo}
                    loadingData={props.loadingData}
                />
            </Col>

        </>
    )
}

let mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        usersOnline: state.firebase.ordered.presence,
        currentDialogUserInfo: state.firestore.ordered[currentDialogUser],
        profile: state.firebase.profile,
        currentChatUsersInfo: state.filtDialogs.currentChatUsersInfo,
        loadingData: state.filtDialogs.loadingData
    }
}
export default connect(mapStateToProps, {
    setCurrentChatUInfoUserTC,
    setCurrentChatUInfoMyInfoTC
})(HeaderMessages);