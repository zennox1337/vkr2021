import React from 'react';
import {Button as BaseButton} from 'antd'
import classnames from 'classnames'
import './Button.scss'

const Button = (props) => {
    return(
        <BaseButton {...props} className={classnames('button', props.className,{
            "button__large" : props.size === 'large'
        })}/>
    )
}

export default Button