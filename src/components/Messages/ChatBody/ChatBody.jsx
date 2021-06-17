import React from 'react'
import { connect } from 'react-redux';
import Message from './Message/Message';
import UserAvatar from './UserAvatar/UserAvatar';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setLimitMessages, deleteMessageTC } from './../../../redux/messagesReducer';
import LimitMessages from './LimitMessages/LimitMessages';



const ChatBody = (props) => {
    let alignMessage = (uid) => {
        if (props.myId === uid) {
            return 'flex-end'
        } else {
            return 'flex-start'
        }
    }
    //загружаем
    if (!props.currentChatUsersInfo.myinfo || !props.currentChatUsersInfo.userInfo) {
        return ''
    }
    //определение аватара
    const myAvatar = <UserAvatar
        photoURL={props.currentChatUsersInfo.myinfo.avatarLink} />;
    const userAvatar = <UserAvatar
        photoURL={props.currentChatUsersInfo.userInfo.avatarLink} />

    //делаем копию, для reverse массива сообщений
    const copyArrayMessages = [...props.messages];
    //
    if (props.loadingData) {
        return ''
    }
    return (
        <div>
            <LimitMessages
                setLimitMessages={props.setLimitMessages}
                messages={copyArrayMessages}
                limitMessages={props.limitMessages}

            />
            {copyArrayMessages && copyArrayMessages.length >= 1 ?
                copyArrayMessages.slice(0).reverse().map((m) => {
                    return <Message alignMessage={alignMessage(m.uid)}
                        messageType={m.messageType}
                        message={m.body}
                        key={m.id}
                        createdAt={m.createdAt}
                        userAvatar={userAvatar}
                        myAvatar={myAvatar}
                        messageId={m.id}
                        deleteMessageTC={props.deleteMessageTC}
                        title={m.title ? m.title : ''}
                        dialogId={props.dialog[0].id}
                    />
                })
                :
                'У вас нет сообщений с этим пользователем!'
            }
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        currentChatUsersInfo: state.filtDialogs.currentChatUsersInfo,
        loadingData: state.filtDialogs.loadingData,
        limitMessages: state.sendMessages.limitMessages
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        setLimitMessages,
        deleteMessageTC
    }))(ChatBody)