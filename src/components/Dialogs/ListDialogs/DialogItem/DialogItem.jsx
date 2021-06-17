import React from 'react'
import { Col, Row } from 'antd'
import { NavLink } from 'react-router-dom';
import { getNameInDialog } from '../../Helper/HelperDialog';
import DialogItemAvatar from './DialogItemAvatar';
import { ParsingLastMessage } from './../../Helper/HelperDialog';



const DialogItem = (props) => {
    //parsing lastMessage
    const Parse = <ParsingLastMessage lastMessage={props.lastMessage} />;
    //end
    const currentDialogStyle = props.roomId === props.id ? 'active' : ''
    return (
        <Col span={24} className={'dialog__item ' + currentDialogStyle} key={props.id}>
            <NavLink to={'/chat/dialog/' + props.id} >
                <Row>
                    <Col>
                        <DialogItemAvatar
                            invited={props.invited}
                            creator={props.creator}
                            users={props.users}
                            myId={props.myId}
                        />
                    </Col>
                    <Col span={20}>
                        <h3 className='dialogs__username'>
                            <b>{getNameInDialog(
                                props.invited,
                                props.creator,
                                props.users,
                                props.myId
                            )}
                            </b>

                        </h3>
                        <p className='dialogs__pastmessage'>
                            {props.lastMessage ? Parse :
                                'нет сообщений'
                            }
                        </p>
                    </Col>
                </Row>
            </NavLink>
        </Col>
    )
}

export default DialogItem