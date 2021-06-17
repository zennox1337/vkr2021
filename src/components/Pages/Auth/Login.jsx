import React from 'react';
import MainBlock from '../../MainBlock/MainBlock';
import './Auth.scss'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { authThunkCreator} from '../../../redux/authReducer';
import AuthForm from './../../Forms/AuthForm/AuthForm';
import { Redirect } from 'react-router-dom';



const Login = (props) => {
    if(props.firebaseAuth.uid){
        return <Redirect to='/chat'/>
    }
    return (
        <section className='auth'>
            <div className="auth__content">
                <div className="auth__top">
                    <h1>bazaar</h1>
                    <h2>Добро пожаловать</h2>
                    <p>Авторизуйтесь, чтобы
                        </p>
                    <p>начать пользоваться
                        </p>
                    <p>приложением</p>
                </div>
                <MainBlock>
                    <AuthForm authThunkCreator={props.authThunkCreator}
                        errorsAuth={props.errorsAuth}
                        isLoadedAuth={props.isLoadedAuth}
                    />
                </MainBlock>
            </div>
        </section>
    )
}

let mapStateToProps = (state) => {
    return {
        isLoadedAuth: state.auth.isLoaded,
        errorsAuth: state.auth.errors
    }
}

export default compose(
    connect(mapStateToProps, {
        authThunkCreator
    })
)(Login);