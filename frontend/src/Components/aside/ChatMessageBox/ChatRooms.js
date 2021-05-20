import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

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
        axios.get('http://localhost:8080/chat/rooms')
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
                      <img src="https://img-premium.flaticon.com/png/512/2950/2950711.png?token=exp=1621496121~hmac=aab8cf9c7bcdf6e1b9c460d3491fd840" width="20" />
                      &nbsp;{room.certificateCode.certificateClassificationCode}
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