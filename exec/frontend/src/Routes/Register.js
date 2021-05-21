import React, {Component} from 'react';
import '../Components/css/register/style.scss';
import { MediumLogo } from '../assets/index';
import RegisterForm from '../Components/register/registerForm';

class Register extends Component{    
    render() {
        return (
            <div class="register">
                <div class="logo">
                    <MediumLogo/>
                </div>  
                        
                <RegisterForm/>
            </div>
        );
    };
} export default Register;