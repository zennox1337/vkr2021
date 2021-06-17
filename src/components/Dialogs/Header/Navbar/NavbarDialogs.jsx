import React from 'react'
import { connect } from 'react-redux'
import { checkDuplicateAndCreateRoom } from '../../../../redux/CreateChat'
import ModalCreateDialog from '../../ModalCreateDialog/ModalCreateDialog'

const NavbarDialogs = (props) => {
    const creatingChat = (value) => {
        props.checkDuplicateAndCreateRoom(value, props.filteredDialogs)
    }
    return (
        <div>
            <ModalCreateDialog
                creatingChat={creatingChat}
                users={props.users}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return{
        filteredDialogs: state.filtDialogs.filteredDialogs,
        users: state.firestore.ordered.users
    }
}

export default connect(mapStateToProps,{
    checkDuplicateAndCreateRoom
})(NavbarDialogs)