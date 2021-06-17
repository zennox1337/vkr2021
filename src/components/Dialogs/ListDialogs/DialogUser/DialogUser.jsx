import React from 'react'
import MapSearchDialogs from './../../Search/MapSearchDialogs';


const DialogUser = (props) => {
    if (props.searchDialogs.length >= 1) {
        return <MapSearchDialogs
            searchDialogs={props.searchDialogs}
            users={props.users}
            myId={props.myId}
        />
    }
    return (
        <>
            {props.dialogs}
        </>
    )
}


export default DialogUser