import React, { Component } from 'react';
import InputForm from '../login/inputForm';
import '../css/login/style.scss'

class LoginForm extends Component {
    render() {
        return (
            <div class="loginForm">
                <InputForm label="이메일" name="email"/>
                <InputForm label="비밀번호" name="password" type="password"/>
            </div>
        );
    }
}

export default LoginForm;