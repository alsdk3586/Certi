import axios from 'axios'

class RegisterService {
    // send userName, userPassword, userNickname to the SERVER
    executeJwtRegisterService(userEmail, userPassword, userNickname) {
        return axios.post(
            'http://k4a407.p.ssafy.io:8080/api/user/join',
            {
                userEmail,
                userPassword,
                userNickname
            }
        );
    }

    duplicateCheckClick(userNickname) {
        return axios.post(
            'http://k4a407.p.ssafy.io:8080/api/user/nicknameDuplicateCheck',
            {
                userNickname
            }
        );
    }
}

export default new RegisterService()