import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';

class ChatRooms extends Component {
    // state = {
    //     ChatRoomList: [],
    // };

    constructor(props) {
        super(props);
        this.state =
          {
            ChatRoomList: [],
          };
      }

    getList = async() => {
        axios.get('http://localhost:8080/chat/rooms')
            .then(({ data }) => {
                this.setState({
                    ChatRoomList: data
                });
            })
            .catch(e => {
                console.error(e);
            });
    };

    componentDidMount() {
        this.getList();
    }

    handleConnectPublicly = () => {
        // this.props.connect(this.state.username, false)
        this.props.connect(localStorage.getItem('authenticatedUser'), false)
      }
    
    render() {
        const { ChatRoomList } = this.state;
        return (
            <div class="row">
                <div class="col-md-12">
                        <tbody>
          {ChatRoomList &&
            ChatRoomList.map((room) => (
              <tr key={room.certificateCode.certificateCode}>
                <td>
                  <Link to={`/ChatBox/${room.certificateCode.certificateCode}`}>
                  <Button variant="contained" color="primary" onClick={this.handleConnectPublicly} >
                    {room.certificateCode.certificateClassificationCode}
                  
                    </Button>
                    </Link>
                </td>
              </tr>
            ))}
        </tbody>
                </div>
            </div>
        )
    }
}

export default ChatRooms;