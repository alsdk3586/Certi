import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            showSuccessMessage: false,
            duplicateCheck: false,
            buttonColor: "background: rgba(238, 238, 238, 0.3)",
            textColor: "color: #FFFFFF",
            cursor: "cursor: default"
        }
        this.handleChange = this.handleChange.bind(this)
        this.registerClick = this.registerClick.bind(this)
        this.duplicateCheckClick = this.duplicateCheckClick.bind(this)
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

    handleActivation() {
        if (this.state.userEmail.includes("@") && this.state.userPassword.length >= 3 && this.state.duplicateCheck === true) {
            this.setState({
                buttonColor: "#e1eef6",
                textColor: "#000000",
                showSuccessMessage: true,
                cursor: "pointer",
                duplicateCheck: true
            })
        }
        else {
            this.setState({
                buttonColor: "rgba(238, 238, 238, 0.3)",
                showSuccessMessage: false,
                cursor: "default",
                duplicateCheck: false
            })
        }
    }

    registerClick() {
        RegisterService
            .executeJwtRegisterService(this.state.userEmail, this.state.userPassword, this.state.userNickname)
            .then((response) => {
                this.props.history.push(`/login`)

            }).catch((response) => {
                this.setState({showSuccessMessage:false})
            })
    }

    duplicateCheckClick() {
        RegisterService
            .duplicateCheckClick(this.state.userNickname)
            .then(() => {
                alert("사용가능한 닉네임입니다");
                this.setState({ duplicateCheck:true })

            }).catch((response) => {
                alert("이미 사용중인 닉네임입니다");
                this.setState({showSuccessMessage:false})
        })

    }
    
    render() {
        return (
            <div class="registerForm" onKeyUp={this.handleActivation}>
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
                <Link to = "`/`">
                <div class="registerButton"
                    onClick={this.registerClick}
                    style={{
                        backgroundColor: this.state.buttonColor,
                        color: this.state.textColor,
                        cursor: this.state.cursor
                    }}>
                        회원가입</div>
                </Link>
            </div>
        );
    }
}
export default RegisterForm;