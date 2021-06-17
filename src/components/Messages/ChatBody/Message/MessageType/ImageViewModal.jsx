import React from 'react';
import { Modal} from 'antd';
import './ImageViewModal.scss'
const ImageViewModal = (props) => {

    return (
        <div className='imageview__modal'>
            <Modal
                className={'imageview__modal'}
                visible={props.visible}
                onCancel={props.handleCancel}
                width='80%'
                footer={[]}>

                <img src={props.image} alt={'imageview'} />
            </Modal>
        </div>

    )
}


export default ImageViewModal


