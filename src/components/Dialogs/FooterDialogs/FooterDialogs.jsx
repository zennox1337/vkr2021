import React from 'react'

import { signOutThunkCreator } from './../../../redux/authReducer';
import Button from './../../Button/Button';
import { connect } from 'react-redux';

const FooterDialogs = (props) => {
    return (
        <div>
            <Button onClick={props.signOutThunkCreator}>Sign out</Button>
        </div>
    )
}

export default connect(null, {
    signOutThunkCreator: signOutThunkCreator
})(FooterDialogs)