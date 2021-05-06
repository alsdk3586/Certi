import React, { Component } from 'react';
import InputForm from './inputForm';
import AuthenticationService from './authenticationService.js'
import RegisterButton from './registserButton';
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
        AuthenticationService
        .executeJwtAuthenticationService(this.state.userEmail, this.state.userPassword)
        .then((response) => {
            console.log(response)
            this.setState({
                token: response.data.token
            });
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.userEmail,this.state.token)
            // this.props.history.push(`/welcome/${this.state.username}`)
            this.props.history.push('/')
        }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
                    <RegisterButton to="/register">회원가입</RegisterButton>
                </div>
            </form>
        );
    }
}
export default LoginForm;