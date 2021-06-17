import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const UserAvatar = (props) => {

    return (
        <>
            <Avatar size={34} icon=
                {props.photoURL !== '' ?
                    <img src={props.photoURL} alt='myAvatar' />
                    :
                    <UserOutlined />
                }
            />
        </>
    )
}

export default UserAvatar