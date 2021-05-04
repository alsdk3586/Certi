import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as authActions from '../../redux/modules/auth';

import InputForm from './inputForm';
import LoginButton from './loginButton';
import RegisterButton from './registserButton';
import '../css/login/style.scss';

class LoginForm extends Component {
    render() {
        // const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        // const { handleChange } = this;

        return (
            <div class="loginForm">
                <InputForm
                    label="이메일"
                    name="email"/>
                <InputForm
                    label="비밀번호"
                    name="password"
                    type="password"/>
                <LoginButton>로그인</LoginButton>
                <RegisterButton to="/register">회원가입</RegisterButton>
            </div>
        );
    }
}
export default LoginForm;
// export default connect(
//     (state) => ({
//         form: state.auth.getIn(['login', 'form'])
//     }),
//     (dispatch) => ({
//         AuthActions: bindActionCreators(authActions, dispatch)
//     })
// )(LoginForm);