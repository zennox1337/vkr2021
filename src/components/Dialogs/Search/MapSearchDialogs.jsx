import React from 'react';
import DialogItem from './../ListDialogs/DialogItem/DialogItem';

const MapSearchDialogs = (props) => {
    const mapping = props.searchDialogs && props.searchDialogs.map((m) => {
        return <DialogItem id={m.id} invited={m.invited} key={m.id}
            roomId={props.roomId}
            creator={m.creator}
            users={props.users}
            myId={props.myId}
            lastMessage={m.lastMessage}
        />
    })
    return mapping
}

export default MapSearchDialogs