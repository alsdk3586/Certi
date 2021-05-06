import axios from 'axios'

class CertiService {
    executeService() {
        console.log('executed service')
        return axios.get('http://localhost:8080/');        
    }
}

export default new CertiService()