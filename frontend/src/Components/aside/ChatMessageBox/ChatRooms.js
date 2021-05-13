import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class ChatRooms extends Component {
    state = {
        ChatRoomList: [],
    };

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
    
    
    render() {
        const { ChatRoomList } = this.state;
        console.log(ChatRoomList)
        return (
            <div class="row">
                <div class="col-md-12">
                        <h3>채팅방 리스트</h3>
                        <div></div>
                </div>
            </div>
        );
    }
}

export default ChatRooms;