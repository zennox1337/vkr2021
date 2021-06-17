import React from 'react'
import { userIsOnlineInDialog } from '../MessagesHelper/MessagesHelper'
import { Spin } from 'antd'



const CurrentUser = (props) => {

    if (props.loadingData) {
        return <Spin/>
    }
    return (
        <>
            {
                props.userInfo &&
                <div>
                    <h3 className="messages__currentName">
                        {props.userInfo.firstName}
                    </h3>
                    <p className="messages__isonline">
                        {userIsOnlineInDialog(props.userInfo.id, props.usersOnline)}
                    </p>
                </div>
            }
        </>

    )
}

export default CurrentUser
