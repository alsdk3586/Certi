import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../Components/css/login/style.scss';
import { BigLogo } from '../assets/index';
import LoginForm from '../Components/login/loginForm';

class Login extends Component{
    handleCreate = (data) => {
        console.log(data);
    }
    
    render() {
        return (
            <Router>
                <div class="login">
                    <div class="logo">
                        <BigLogo/>
                    </div>  
                        
                    <LoginForm onCreate={this.handleCreate}/>
                </div>
            </Router>
            
        );
    };
} export default Login;