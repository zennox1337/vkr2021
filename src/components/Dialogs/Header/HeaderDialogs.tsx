import React from 'react'
import { Col } from 'antd'
import ProfileUser from './ProfileUser/ProfileUser'
import NavbarDialogs from './Navbar/NavbarDialogs';
import './HeaderDialogs.scss'
import { connect } from 'react-redux';
import { setUserImageTC } from '../../../redux/meReducer';
import { FirebaseReducer } from 'react-redux-firebase';
import { AppStateType } from '../../../redux/store';

type MapPropsType = {
    profile: FirebaseReducer.Profile<any>,
    myId: string
}
type DispatchPropsType = {
    setUserImageTC: (file: File,myId:string) => void
}

type PropsType = MapPropsType & DispatchPropsType

const HeaderDialogs:React.FC<PropsType> = (props) => {
    return (
        <>
            <Col>
                <ProfileUser profile={props.profile}
                setUserImageTC={props.setUserImageTC}
                myId={props.myId}
                />
            </Col>
            <Col>
                <NavbarDialogs />
            </Col>
        </>
    )
}
let mapStateToProps = (state:AppStateType):MapPropsType => {
    return{
        profile: state.firebase.profile,
        myId: state.firebase.auth.uid
    }
}
export default connect(mapStateToProps, {
    setUserImageTC
})(HeaderDialogs)