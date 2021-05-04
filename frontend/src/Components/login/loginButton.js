import React from 'react';
import '../css/login/style.scss'


const LoginButton = ({children, onClick}) => (
    <div class="loginButton" onClick={onClick}>
        {children}
    </div>
);

export default LoginButton;