import React from 'react'
import { Row, Col } from 'antd';
import MessageType from './MessageType';
import './Message.scss'


const Message = (props) => {
    function confirmDeleteMessage(e) {
        props.deleteMessageTC(props.messageId, props.dialogId)
    }

    function cancelDeleteMessage(e) {
        console.log(e);
    }
    return (
        <Col span={24}>
            <Row justify={props.alignMessage}>
                {props.alignMessage === 'flex-end' ?
                    <>
                        <Col span={24}>
                            <div className="messageItem"
                                style={{ justifyContent: props.alignMessage }}>
                                <MessageType message={props.message}
                                    createdAt={props.createdAt}
                                    title={props.title}
                                    confirmDeleteMessage={confirmDeleteMessage}
                                    cancelDeleteMessage={cancelDeleteMessage}
                                    messageType={props.messageType} />
                                {props.myAvatar}
                            </div>
                        </Col>
                    </>
                    :
                    <>
                        <Col span={24}>
                            <div className="messageItem"
                                style={{ justifyContent: props.alignMessage }}>
                                {props.userAvatar}
                                <MessageType message={props.message}
                                    createdAt={props.createdAt}
                                    title={props.title}
                                    messageType={props.messageType} />
                            </div>
                        </Col>
                    </>
                }
            </Row>
        </Col>
    )
}

export default Message