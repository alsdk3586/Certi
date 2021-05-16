import React, {Component} from 'react';
import './Login.css'
import Button from '@material-ui/core/Button';
export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state =
          {
            username: ''
          };
      }

    handleConnectPublicly = () => {
        this.props.connect(localStorage.getItem('authenticatedUser'), false)
      }
    
    render(){
        return(
            <div className="component-Login">
              <Button variant="contained" color="primary" onClick={this.handleConnectPublicly} >
                Start Chatting
             </Button>

            </div>
        )
    }
}
