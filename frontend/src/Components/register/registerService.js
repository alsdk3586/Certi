import axios from 'axios'

class RegisterService {
    // send userName, userPassword, userNickname to the SERVER
    executeJwtRegisterService(userEmail, userPassword, userNickname) {
        return axios.post('http://localhost:8080/api/user/join', {
            userEmail,
            userPassword,
            userNickname
        })
    }

    executeService() {
        console.log("===execute Service===")
        return axios.get('http://localhost:8080/');        
    }

    registerSuccess(userEmail, userNickname) {
        console.log("=== register success ===")
    }
}

export default new RegisterService()