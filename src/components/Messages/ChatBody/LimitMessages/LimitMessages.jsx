import React from 'react'
import './LimitMessages.scss'
import { RedoOutlined } from '@ant-design/icons';

class LimitMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showButton: true
        };
        this.toggleShow = this.toggleShow.bind(this)
        this.toggleActive = this.toggleActive.bind(this)
    }
    toggleShow() {
        this.setState({
            showButton: false
        })
    }
    toggleActive() {
        this.setState({
            showButton: true
        })
    }
   
    componentDidUpdate(prevProps) {
        if (this.props.messages.length !== prevProps.messages.length) {
            if(this.props.messages.length < prevProps.messages.length){

            }
            else if (this.props.limitMessages > this.props.messages.length) {
                this.toggleShow();
            }
        }
    }
    componentWillUnmount() {
        this.toggleActive();
        this.props.setLimitMessages(10);
    }
    render() {
        const setNewLimit = () => {
            this.props.setLimitMessages(this.props.limitMessages + 10)
        }
        if(this.props.messages.length <= 9){
            return ''
        }
        return (
            <>
                {this.state.showButton &&
                    <div className="limitMessages">
                        <RedoOutlined 
                         onClick={() => {setNewLimit()}}
                        style={{fontSize: '20px'}}
                        />
                    </div>

                }
            </>
        )
    }
}

export default LimitMessages