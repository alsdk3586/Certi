import React, {Component} from 'react';
import '../Components/css/login/style.scss';
import { BigLogo } from '../assets/index';
import LoginForm from '../Components/login/loginForm';
import RegisterButton from '../Components/login/registserButton';

class Login extends Component{    
    render() {
        return (
            <div class="login">
                <div class="logo">
                    <BigLogo/>
                </div>  
                        
                <LoginForm/>
                <RegisterButton to="/register">회원가입</RegisterButton>
            </div>
        );
    };
} export default Login;