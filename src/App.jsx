import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Login from './components/Pages/Auth/Login';
import Register from './components/Pages/Auth/Register';
import { Spin } from 'antd';
import Chat from './components/Pages/Chat/Chat';


const App = (props) => {
  if (props.location.pathname === '/') {
    return <Redirect to='/login' />
  }
  if(!props.firebaseAuth.isLoaded){
    return <Spin />
  }
  return (
    <div className="wrapper">
      <Route path='/chat' render={() => (<Chat firebaseAuth={props.firebaseAuth}/>)} />
      <Route path='/login' render={() => (<Login firebaseAuth={props.firebaseAuth}/>)} />
      <Route path='/register' render={() => (<Register firebaseAuth={props.firebaseAuth}/>)} />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    firebaseAuth: state.firebase.auth
  }
}
export default compose(
  withRouter,
  connect(mapStateToProps))(App);
