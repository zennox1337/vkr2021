import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import ImageViewModal from './ImageViewModal';


const ImageMessage = (props) => {
    const [image, setImageLink] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    };

    //Получение ссылки на аудио, так как ссылка через какое-то время
    //недействительна
    const firebase = useFirebase();
    if (props.image) {
        const storageRef = firebase.storage().ref()
        storageRef.child(props.image).getDownloadURL().then((resp) => {
            setImageLink(resp)
        })
    }
    if (!image) {
        return ''
    }
    return (
        <>
            {props.title ? props.title : ''}
            <div className='imgItem' onClick={showModal}
                style={{ backgroundImage: `url(${image})` }}>
                <img src={image} alt='imageMessage' />
            </div>

            <ImageViewModal image={image}
                visible={visible}
                showModal={showModal}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default ImageMessage