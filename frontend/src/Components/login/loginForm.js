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
            showSuccessMessage: false, // 로그인 성공 시 버튼 활성화
            buttonColor: "background: rgba(238, 238, 238, 0.3)",
            textColor: "color: #FFFFFF"
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.handleActivation = this.handleActivation.bind(this)
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
            
            if (this.state.showSuccessMessage === true) { // 로그인 성공 시 페이지 이동
                this.props.history.push(`/user`)
                // this.props.push('/')
            }
            else {
                alert("로그인에 실패하였습니다")
            }
            
        }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
    }

    handleActivation() {
        if (this.state.userEmail.includes("@") && this.state.userPassword.length >= 3) {
            this.setState({
                buttonColor: "#e1eef6",
                textColor: "#000000",
                showSuccessMessage: true
            })
        }
        else {
            this.setState({
                buttonColor: "rgba(238, 238, 238, 0.3)",
                showSuccessMessage: false
            })
        }
    }
    
    render() {
        return (
            <div class="loginForm" onKeyUp={this.handleActivation}>
                <InputForm
                    label="이메일"
                    name="userEmail"
                    required
                    value={this.state.userEmail}
                    onChange={this.handleChange}
                />
                <InputForm
                    label="비밀번호"
                    name="userPassword"
                    required
                    type="password"
                    value={this.state.userPassword}
                    onChange={this.handleChange}
                />
                <div
                    class="loginButton"
                    onClick={this.loginClicked}
                    style={{
                        backgroundColor: this.state.buttonColor,
                        color: this.state.textColor
                    }}>
                    로그인</div>
            </div>
        );
    }
}
export default LoginForm;