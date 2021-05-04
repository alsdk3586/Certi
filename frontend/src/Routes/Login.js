import React, {Component} from 'react';
import '../Components/css/login/style.scss';
import { BigLogo } from '../assets/index';
import LoginForm from '../Components/login/loginForm';

class Login extends Component{
    render() {
        return (
            <div class="login">
                <div class="logo">
                    <BigLogo/>
                </div>  
                    
                <LoginForm/>
            </div>
        );
    };
} export default Login;