import React, { useState } from 'react'
import { Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useFirebase } from 'react-redux-firebase';
import './AvatarUpdate.scss'

const AvatarUpdate = (props) => {
    const [userAvatar, setAvatar] = useState(null);
    const firebase = useFirebase();
    if (props.profile.photoURL) {
        const storageRef = firebase.storage().ref()
        storageRef.child(props.profile.photoURL).getDownloadURL().then((resp) => {
            setAvatar(resp)
        })
    }

    const userImage = userAvatar ?
        <img src={userAvatar} alt='avatar'/>
        :
        <UserOutlined />

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            props.setUserImageTC(file, props.myId)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }
    return (
        <>
            <Col>
                <Avatar size={40} icon={userImage} />
            </Col>
            <div className='fileInputAvatar'>
                <input
                    type="file"
                    onChange={(e) => handleImageChange(e)} />
            </div>
        </>
    )
}

export default AvatarUpdate