import React from 'react'
import { Row, Col } from 'antd';

import AvatarUpdate from './AvatarUpdate';


const ProfileUser = (props) => {
   
    return (
        <>
            <Row>
                <AvatarUpdate 
                profile={props.profile}
                setUserImageTC={props.setUserImageTC}
                myId={props.myId}
                />

                <Col>
                    <h3 className='profile__name'><b>{props.profile.email}</b></h3>
                    <p className='profile__online'>Online</p>
                </Col>
            </Row>
        </>
    )
}

export default ProfileUser