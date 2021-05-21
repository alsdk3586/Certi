import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import ChatImg from '../../../assets/chat.png';

const Slink = styled(Link)`
  fontSize: 16px; 
  &:hover {
    color: black;
    background-color: gray;
    text-decoration-line: none;
    font-weight: bold;
    font-size: 110%
  }
`;
const Ul = styled.ul`
  padding-top: 5px;
  padding-bottom: 5px;
  &:hover {
    background-color: #e6dddc;
    opacity: 0.6;
    z-index: 10;
  }
`;

class ChatRooms extends Component {
    constructor(props) {
        super(props);
        this.state =
          {
            ChatRoomList: [],
          };
      }

    getList = async() => {
        axios.get("http://k4a407.p.ssafy.io:8080/chat/rooms")
            .then((res) => {
                this.setState({
                    ChatRoomList: res.data
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
                  <Slink to={`/ChatBox/${room.certificateCode.certificateCode}`} target="_blank"
                  style={{textDecoration: "none"}}
                  >
                  <Ul variant="contained" color="primary">
                    <>
                      <img src={ChatImg} width="20" />
                      &nbsp;
                      {room.certificateCode.certificateClassificationCode}
                    </>
                    </Ul>
                    </Slink>
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