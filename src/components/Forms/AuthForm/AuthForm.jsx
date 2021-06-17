import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import Button from '../../Button/Button'
import { NavLink } from 'react-router-dom';
import ShowErrors from '../../Assets/ShowErrors/ShowErrors';
import './AuthForm.scss'

const AuthForm = React.memo(props => {
    const onFinish = values => {
        console.log('Success:', values);
        props.authThunkCreator(values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
          
            <ShowErrors error={props.errorsAuth.errorsSignIn}/>
         
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите email!',
                    },
                ]}>
                <Input size="large" placeholder="Email адрес"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите пароль!',
                    },
                ]}>
                <Input.Password size="large" placeholder="Пароль"/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox size="large">Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item >
                <Button type="primary" size="large" htmlType="submit">
                    Войти
            </Button>
            </Form.Item>
            <Form.Item>
                <p>У вас нет аккаунта?</p>
                <NavLink className='auth__register-link' to='/register'>Зарегистрироваться</NavLink>
            </Form.Item>
        </Form>

                )
})


export default AuthForm