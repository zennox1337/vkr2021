import React, { useEffect } from 'react'
import { Spin, Alert } from 'antd';
import './Messages.scss'
import { useFirestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendMessageTC } from '../../redux/messagesReducer';
import { compose } from 'redux';
import { chatAccess } from './MessagesHelper/MessagesHelper';
import { setCurrentRoomId } from '../../redux/dialogsReducer';
import Messages from './ChatBody/Messages';

const currentDialog = 'dialog'
const messagesData = 'messages'

const MessagesContainer = (props) => {
  useFirestoreConnect([
    {
      collection: 'dialogs', doc: props.match.params.roomId,
      storeAs: currentDialog
    }
  ])
  useFirestoreConnect([
    {
      collection: `dialogs/${props.match.params.roomId}/messages`,
      limit: props.limitMessages,
      orderBy: ['createdAt', 'desc'],
      storeAs: messagesData
    }
  ])

  useEffect(() => {
    props.setCurrentRoomId(props.match.params.roomId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.roomId])

  if (!props.dialog) {
    return <div><Spin /></div>
  } else if (chatAccess(props.dialog, props.myId)) {
    return <Alert message="У вас нет доступа" type="error" />
  }
  return (
     <Messages {...props}/>
  )
}

let mapStateToProps = (state) => {
  return {
    myId: state.firebase.auth.uid,
    dialog: state.firestore.ordered[currentDialog],
    messages: state.firestore.ordered[messagesData],
    users: state.firestore.ordered.users,
    profile: state.firebase.profile,
    limitMessages: state.sendMessages.limitMessages
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, {
    sendMessageTC,
    setCurrentRoomId
  }))(MessagesContainer)