import axios from 'axios'

class LoginService {
    // send username, password to the SERVER
    executeJwtLoginService(userEmail, userPassword) {
        return axios.post('http://k4a407.p.ssafy.io:8080/api/user/login', {
            userEmail,
            userPassword
        });
    }

    executeService() {
        return axios.get('http://k4a407.p.ssafy.io:8080/');        
    }

    // 로그인 성공 시 userEmail을 autenticatedUser로 localStorage에 저장
    // jwtToken을 생성해 setupAxiosInterceptors에 저장
    registerSuccessfulLoginForJwt(userEmail, token) {
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', userEmail);
        this.setupAxiosInterceptors();
    }

    // 앞에 Bearer를 추가해서 Token 생성
    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');

        if (token) {
            return true;
        }
        
        return false;
    }

    getLoggedInUserName() {
        let user = localStorage.getItem('authenticatedUser');
        if(user === null) return '';
        return user;
    }
}

export default new LoginService()