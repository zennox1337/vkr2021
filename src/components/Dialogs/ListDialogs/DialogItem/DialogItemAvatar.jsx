import React, { useState } from 'react'
import { getImageAvatarUser } from '../../Helper/HelperDialog'
import { useFirebase } from 'react-redux-firebase';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


const DialogItemAvatar = (props) => {
    const [userAvatar, setAvatar] = useState('');
    const firebase = useFirebase();
    const avatarUser = getImageAvatarUser(props.invited, props.creator, props.users, props.myId)
    if (avatarUser) {
        const storageRef = firebase.storage().ref()
        storageRef.child(avatarUser).getDownloadURL().then((resp) => {
            setAvatar(resp)
        })
    }

    return (
        <Avatar size={30}
            icon={userAvatar === '' ?
                <UserOutlined />
                :
                <img src={userAvatar} alt='avatar' />
            } />
    )
}

export default DialogItemAvatar