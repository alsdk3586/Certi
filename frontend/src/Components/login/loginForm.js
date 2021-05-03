import React, {Component} from 'react';

class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    };
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleOnClick = (e) => {
        console.log(this.state.email, this.state.password);
    }
    render() {
        return (
            <div class="loginForm">
                <div class="input">
                    <input
                        type="email"
                        id="inputEmail"
                        placeholder="이메일"
                        name="email"
                        onChange={this.handleChange} />
                    <br></br>
                    <input
                        type="password"
                        id="inputPassword"
                        placeholder="비밀번호"
                        name="password"
                        onChange={this.handleChange} />
                </div>
                <button class="loginButton"
                    type="button"
                    onClick={this.handleOnClick}>
                    로그인
                </button>
            </div>
        );
    };
} export default LoginForm;