import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './ImagePreview.scss'
import ImageViewModal from './../../ChatBody/Message/MessageType/ImageViewModal';
const ImagePreview = (props) => {
    //for modal
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    };

    return (
        <>
            <div className='previewImg'>
                <img src={props.previewImg} alt='preview' onClick={showModal}/>
                <div className="closeButton">
                    <CloseOutlined onClick={() => { props.removeImageAC(true) }} />
                </div>
            </div>
            <ImageViewModal image={props.previewImg}
                visible={visible}
                showModal={showModal}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default ImagePreview