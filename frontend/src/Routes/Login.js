import React, {Component} from 'react';
import '../Components/css/login/style.scss';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { email: "", phone: "" };
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleOnClick = (e) => {
        console.log(this.state.email, this.state.phone);
    }
    render() {
        return (
            <form className="login">
                <div class="logo"> 자격증닷컴</div>  
                <div class="contents">
                    <input type="email" id="inputEmail" placeholder="이메일" name="email" onChange={this.handleChange} />
                    <br></br>
                    <input type="password" id="inputPassword" placeholder="비밀번호" name="password" onChange={this.handleChange} />
                </div>
                <button class="loginButton"
                    type="button"
                    onClick={this.handleOnClick}>
                    로그인
                </button>
            </form>);
    };
} export default Login;
