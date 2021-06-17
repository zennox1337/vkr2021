import React from 'react'
import { Row } from 'antd';
import HeaderMessages from './../Header/HeaderMessages';
import ChatBody from './ChatBody';
import SendFormMessages from '../SendForm/SendFormMessages';


const Messages = (props) => {
    return (
        <div className="messages">
            <Row className="messages__header">
                <HeaderMessages dialog={props.dialog}
                    myId={props.myId}
                />
            </Row>
            <Row className="messages__body">
                <div className="messages__body__height">
                    <ChatBody
                        dialog={props.dialog}
                        messages={props.messages}
                        myId={props.myId}
                    />
                </div>
            </Row>
            <Row className="messages__sendforms">
                <SendFormMessages />
            </Row>
        </div>
    )
}

export default Messages