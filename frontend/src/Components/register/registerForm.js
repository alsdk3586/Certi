import React, { Component } from 'react'
import InputForm from './inputForm'
import NicknameForm from './nicknameForm'
import RegisterService from './registerService.js'
import '../css/register/style.scss'

class RegisterForm extends Component {
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }

    registerClick() {
        RegisterService
            .executeJwtRegisterService(this.state.userEmail, this.state.userPassword, this.state.userNickname)
            .then((response) => 
                console.log(response)
            ).catch(() => {
                
            })
    }
    
    render() {
        return (
            <div class="registerForm">
                <InputForm
                    label="이메일"
                    name="userEmail"
                    // value={this.state.userEmail}
                    // onChange={this.handleChange}
                /><br/>
                <NicknameForm
                    label="닉네임"
                    name="userNickname"
                    // value={this.state.userNickname}
                    // onChange={this.handleChange}
                /><br/>
                <InputForm
                    label="비밀번호"
                    name="userPassword"
                    type="password"
                    // value={this.state.userPassword}
                    // onChange={this.handleChange}
                />
                <InputForm
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    type="password"
                />
                <div class="registerButton" onClick={this.registerClick}>회원가입</div>
            </div>
        );
    }
}
export default RegisterForm;