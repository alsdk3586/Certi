import React, {Component} from 'react';
import '../Components/css/login/style.scss';
import { BigLogo } from '../assets/index'
import LoginForm from '../Components/login/loginForm'

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


// import React from 'react';
// import '../Components/css/login/style.scss';

// const Login = ({ children }) => (
//     <div class='login'>
//         <div class='logoWrapper'>
//             <div class='logo' onclick="location.href='/'">자격증닷컴</div>
//         </div>
//         <contents>
//             {children}
//         </contents>
//     </div>
// );

// export default Login;