import axios from 'axios'

class CertiService {
    executeService() {
        return axios.get('http://localhost:8080/');        
    }
}

export default new CertiService()