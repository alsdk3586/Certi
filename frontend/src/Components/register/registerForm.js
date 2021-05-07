import React, { Component } from 'react'
import InputForm from './inputForm'
import NicknameForm from './nicknameForm'
import RegisterService from './registerService.js'
import '../css/register/style.scss'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            userEmail: '',
            userPassword: '',
            userNickname: '',
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.registerClick = this.registerClick.bind(this)
        this.duplicateCheckClick = this.duplicateCheckClick.bind(this)
    }

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
            .then((response) => {
                console.log(response)
                this.props.history.push(`/login`)

            }).catch((response) => {
                console.log(response)
                this.setState({showSuccessMessage:false})
            })
    }

    duplicateCheckClick() {
        RegisterService
            .duplicateCheckClick(this.state.userNickname)
            .then(() => {
                alert("사용가능한 닉네임입니다");

            }).catch((response) => {
                console.log(response)
                alert("이미 사용중인 닉네임입니다");
                this.setState({showSuccessMessage:false})
        })

    }
    
    render() {
        return (
            <div class="registerForm">
                <InputForm
                    label="이메일"
                    name="userEmail"
                    value={this.state.userEmail}
                    onChange={this.handleChange}
                /><br/>
                <NicknameForm
                    label="닉네임"
                    name="userNickname"
                    value={this.state.userNickname}
                    onChange={this.handleChange}
                />
                <button className="duplicateCheckButton" onClick={this.duplicateCheckClick}>중복확인</button>
                <br />
                <InputForm
                    label="비밀번호"
                    name="userPassword"
                    type="password"
                    value={this.state.userPassword}
                    onChange={this.handleChange}
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