import React, { Component } from 'react';
import InputForm from './inputForm';
import LoginService from './loginService.js'
import '../css/login/style.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            userPassword: '',
            token: localStorage.getItem("token") || '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }

    loginClicked() {
        LoginService
        .executeJwtLoginService(this.state.userEmail, this.state.userPassword)
        .then((response) => {
            console.log(response)
            this.setState({
                token: response.data.token
            });
            LoginService.registerSuccessfulLoginForJwt(this.state.userEmail, this.state.token)
            
            // 로그인 성공 시 페이지 이동
            this.props.history.push(`/user`)
            // this.props.push('/')
        }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
    }
    
    render() {
        return (
            <div class="loginForm">
                <InputForm
                    label="이메일"
                    name="userEmail"
                    value={this.state.userEmail}
                    onChange={this.handleChange}
                />
                <InputForm
                    label="비밀번호"
                    name="userPassword"
                    type="password"
                    value={this.state.userPassword}
                    onChange={this.handleChange}
                />
                <div class="loginButton" onClick={this.loginClicked}>로그인</div>
            </div>
        );
    }
}
export default LoginForm;