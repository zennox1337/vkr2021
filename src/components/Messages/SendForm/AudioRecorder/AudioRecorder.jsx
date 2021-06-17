import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser"
import { AudioOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import './AduioRecorder.scss'
import { Row, Col } from 'antd';



export default class AudioRecorder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            fastRerender: false
        }
    }
    controlAudio(status) {
        this.setState({
            status
        })
    }
    cancelRecording() {
        this.controlAudio("");
        this.props.setAudioMessageAC(false);
        this.setState({
            fastRerender: true
        })
    }
    render() {
        const { status, audioSrc } = this.state;
        const audioProps = {
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
            status,
            backgroundColor: '#f7f7f7',
            strokeColor: '#000000b5',
            audioSrc,
            timeslice: 1000,
            startCallback: (e) => {
                console.log("succ start", e)
                this.props.setAudioMessageAC(true)
            },
            stopCallback: (e) => {
                this.setState({
                    audioSrc: window.URL.createObjectURL(e)
                })
                this.props.sendAudioMessageTC(e, this.props.myId, this.props.dialogId);
                this.controlAudio("");
                this.props.setAudioMessageAC(false)
            }
        }
        const statusRecording = status === "recording";
        const toggleGraph = statusRecording ? 'showGraph' : 'hideGraph';
        const showOneButton = this.props.audioRecording ? 'showAudioForm' : 'hideAudioForm';
        //полный перезапуск
        if (this.state.fastRerender) {
            this.setState({
                fastRerender: false
            })
            return ''
        }
        return (
            <>
                {showOneButton === 'showAudioForm' ? '' :
                    <div className="sendButton">
                        <AudioOutlined onClick={() => this.controlAudio("recording")}
                            style={{ fontSize: '24px', color: '#08c' }}
                        />
                    </div>
                }
                <Row className={showOneButton}>
                    <Col span="4" offset="4">
                        {statusRecording &&
                            <CloseOutlined style={{ fontSize: '24px', color: '#08c' }}
                                onClick={() => this.cancelRecording()}
                            />
                        }
                    </Col>
                    <Col span="8">
                        <div className={toggleGraph}>
                            <AudioAnalyser {...audioProps} />
                        </div>
                    </Col>
                    <Col span="4" offset="4">
                        {statusRecording &&
                            <SendOutlined style={{ fontSize: '24px', color: '#08c' }}
                                onClick={() => this.controlAudio("inactive")} />
                        }
                    </Col>
                </Row>
            </>
        );
    }
}
