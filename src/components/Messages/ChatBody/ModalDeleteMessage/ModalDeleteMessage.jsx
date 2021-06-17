import React from 'react'
import { Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './ModalDeleteMessage.scss'

const ModalDeleteMessage = (props) => {
    return (
        <Popconfirm
            title="Удалить сообщение?"
            onConfirm={props.confirm}
            onCancel={props.cancel}
            okText="Да"
            cancelText="Нет">
            <div className="deleteMessage">
                <DeleteOutlined />
            </div>
        </Popconfirm>
    )
}

export default ModalDeleteMessage