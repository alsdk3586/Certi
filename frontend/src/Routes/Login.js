import React from 'react';
import '../../Components/css/login/style.scss';

const Login = ({children}) => (
    <login>
        <logoWrapper>
            <logo to="/">자격증닷컴</logo>
        </logoWrapper>
        <contents>
            {children}
        </contents>
    </login>
);

export default Login;