import React, {Component, useEffect} from 'react';
import './Login.css'
import Button from '@material-ui/core/Button';
export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state =
          {
            roomcode: props.roomcode
          };
      }

  handleConnectPublicly = () => {
        this.props.connect(localStorage.getItem('authenticatedUser'), false)
      
  }
  
  componentDidMount() {
    this.handleConnectPublicly();
    // document.location.href = `/ChatBox/${this.state.roomcode}`
  };

  componentDidUpdate() {
  }
    
    render(){
        return(
            <div className="component-Login">
            </div>
        )
    }
}
