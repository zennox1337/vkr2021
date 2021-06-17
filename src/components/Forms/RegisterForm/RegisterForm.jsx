import React from 'react';
import { Form, Input } from 'antd';
import Button from '../../Button/Button'
import { NavLink } from 'react-router-dom';
import ShowErrors from '../../Assets/ShowErrors/ShowErrors';
import "./RegisterForm.scss";

const RegisterForm = React.memo(props => {
    const validateMessages = {
        required: 'Имя обязательное!!',
        types: {
            email: 'Неправильный email!',
        }
    };
    const onFinish = values => {
        console.log('Success:', values);
        props.signUpThunkCreator(values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}>
              <ShowErrors error={props.errorsAuth.errorsSignUp}/>
            <Form.Item name={'email'} rules={[{ type: 'email' }]}>
                <Input size="large" placeholder="Email адрес" />
            </Form.Item>

            <Form.Item name={'firstName'} rules={[{ required: true }]}>
                <Input size="large" placeholder="Ваше Имя" />
            </Form.Item>

            <Form.Item name="password"
                rules={[
                    {
                        required: true,
                        message: 'Введите свой пароль!',
                    },
                ]}
                hasFeedback>
                <Input.Password size="large" placeholder="Пароль"/>
            </Form.Item>

            <Form.Item name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Повторите свой пароль!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Пароли не совпадают!');
                        },
                    }),
                ]}>
                <Input.Password size="large" placeholder="Повтор пароля"/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" size="large" htmlType="submit">Зарегистрироваться </Button>
            </Form.Item>
            <Form.Item>
                <p>У вас уже есть аккаунт?</p>
                <NavLink className='auth__register-link' to='/login'>Войти в аккаунт</NavLink>
            </Form.Item>
        </Form>

    )
})

export default RegisterForm