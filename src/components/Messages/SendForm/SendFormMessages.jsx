import React from 'react';
import './SendFormMessages.scss'
import { Col, Row, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import AudioRecorder from './AudioRecorder/AudioRecorder';
import { sendMessageTC, sendAudioMessageTC, sendImageMessageTC, setImagePreviewUrlAC, setAudioMessageAC, setImageFileAC, removeImageAC, submitTextMessageAC, setCurrentTextMessageAC } from './../../../redux/messagesReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import ImagePreview from './ImageLoader/ImagePreview';
import TextAreaCustom from './TextAreaCustom/TextAreaCustom';


const SendFormMessages = (props) => {
    const typingValue = props.textMessage;
    //text
    const sendingMessage = () => {
        const message = {
            body: typingValue,
            createdAt: new Date(),
            uid: props.myId,
            messageType: 'text'
        }
        props.sendMessageTC(message, props.match.params.roomId);
        props.setCurrentTextMessageAC('')
    }
    //text + image
    const sendingMessageWithImage = () => {
        props.sendImageMessageTC(props.imgFile, props.myId, props.match.params.roomId, typingValue)
        props.setCurrentTextMessageAC('')
    }
    //изменение col ,если записывается ГЛ
    const colOptions2 = props.audioRecording ? 24 : 2;
    const colOptions4 = props.audioRecording ? 24 : 4;
    return (
        <Col span={24}>
            <Row className='maxHeight__sendForm'>
                {props.sendLoading &&
                    <div className="showLoadingProcess">
                        <Spin />
                    </div>
                }
                <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                    {props.audioRecording ? '' :
                        <TextAreaCustom typingValue={typingValue}
                            setValue={props.setCurrentTextMessageAC}
                            sendImageMessageTC={props.sendImageMessageTC}
                            dialogId={props.match.params.roomId}
                            myId={props.myId}
                            setImagePreviewUrlAC={props.setImagePreviewUrlAC}
                            setImageFileAC={props.setImageFileAC}
                            removeImage={props.removeImage}
                            removeImageAC={props.removeImageAC}
                            submitTextMessage={props.submitTextMessage}
                        />
                    }
                    {props.previewImg && <div className="img__preview">
                        <ImagePreview previewImg={props.previewImg}
                            removeImageAC={props.removeImageAC}
                        />
                    </div>}
                </Col>
                <Col xs={colOptions4}
                    sm={colOptions4}
                    md={colOptions2}
                    lg={colOptions2}
                    xl={colOptions2}>
                    {props.previewImg ?
                        <div className="sendButton">
                            <SendOutlined style={{ fontSize: '20px', color: 'red' }}
                                onClick={sendingMessageWithImage}
                            />
                        </div>
                        :
                        typingValue.length >= 1 ?
                            <div className="sendButton">
                                <SendOutlined style={{ fontSize: '20px' }}
                                    onClick={sendingMessage}
                                />
                            </div>
                            :
                            <AudioRecorder
                                sendAudioMessageTC={props.sendAudioMessageTC}
                                dialogId={props.match.params.roomId}
                                myId={props.myId}
                                setAudioMessageAC={props.setAudioMessageAC}
                                audioRecording={props.audioRecording}
                            />
                    }
                </Col>
            </Row>
            <div className="customBottom"></div>
        </Col>
    )
}

let mapStateToProps = (state) => {
    return {
        myId: state.firebase.auth.uid,
        previewImg: state.sendMessages.previewImg,
        audioRecording: state.sendMessages.audioRecording,
        imgFile: state.sendMessages.imgFile,
        removeImage: state.sendMessages.removeImage,
        textMessage: state.sendMessages.textMessage,
        submitTextMessage: state.sendMessages.submitTextMessage,
        sendLoading: state.sendMessages.sendLoading
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        sendMessageTC,
        sendAudioMessageTC,
        sendImageMessageTC,
        setImagePreviewUrlAC,
        setAudioMessageAC,
        setImageFileAC,
        removeImageAC,
        setCurrentTextMessageAC,
        submitTextMessageAC
    }))(SendFormMessages)