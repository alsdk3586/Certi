import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import LoginService from './loginService.js'

class AuthenticatedRoute extends Component {    
    render() {
        if(LoginService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute