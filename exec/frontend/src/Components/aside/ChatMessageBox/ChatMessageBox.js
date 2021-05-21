import React, { Component } from 'react'

import Aside from '../aside/Aside'
import Footer from '../footer/Footer'
import Paper from '@material-ui/core/Paper'
import Login from '../login/Login'
import axios from 'axios'

import './ChatMessageBox.css'
import userImage from '../userImage.png'

var stompClient = null;
class ChatMessageBox extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        username: '',
        roomcode: props.match.params.roomcode,
        channelConnected: false,
        chatMessage: '',
        roomNotification: [],
        broadcastMessage: [],
        error: '',
        bottom: false,
        curTime: '',
        openNotifications: false,
        bellRing: false,
        chatHistory: []
      };
  }

  getChatHistory = async() => {
    axios.get(`http://k4a407.p.ssafy.io:8080/chatHistory/${this.state.roomcode}`)
      .then((res) => {
            this.setState({
              chatHistory: res.data
            });
        })
        .catch(e => {
            console.error(e);
        });
    
  };
  
  connect = (userName) => {

    if (userName) {

      const Stomp = require('stompjs')

      var SockJS = require('sockjs-client')

      SockJS = new SockJS('http://k4a407.p.ssafy.io:8080/ws') // 방 별로 나눠줄 url 추가해주기 

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, this.onConnected, this.onError);
      this.setState({
        username: userName,
        roomcode: this.state.roomcode
      })
    }
  }

  onConnected = () => {

    this.setState({
      channelConnected: true
    })

    // Subscribing to the public topic
    stompClient.subscribe('/topic/pubic', this.onMessageReceived); // SERVER @SendTo

    // Registering user to server as a public chat user
    stompClient.send("/app/addUser", {},
      JSON.stringify({
        sender: this.state.username,
        type: 'JOIN',
        roomcode: this.state.roomcode,
      })) // SERVER @MessageMapping

  }

  sendMessage = (type, value) => {

    if (stompClient) {
      var chatMessage = {
        sender: this.state.username,
        roomcode: this.state.roomcode,
        content: type === 'TYPING' ? value : value,
        type: type

      };
      
      if (type === 'CHAT') { // send public message
        stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage)); // SERVER @MessageMapping 채팅 DB에 저장 
      }
    }
  }

  onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {

      this.state.roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime, 'roomcode': message.roomcode })
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })

    }
    else if (message.type === 'LEAVE') {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "offline";
          notification.sender = message.sender + " ~ left";
          notification.dateTime = message.dateTime;
          notification.roomcode = message.roomcode;
        }
      })
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })
    }
    else if (message.type === 'TYPING') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          if (message.content)
            notification.status = "typing...";
          else
            notification.status = "online";
        }

      })
      this.setState({
        roomNotification: this.state.roomNotification
      })
    }
    else if (message.type === 'CHAT') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "online";
        }
      })
      this.state.broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime,
        roomcode: message.roomcode
      })
      this.setState({
        broadcastMessage: this.state.broadcastMessage,

      })
    }
    else {
      // do nothing...
    }
  }

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  }

  fetchHostory = () => {
    alert('History Not Available!\nIt is Not Yet Implemented!');
  }

  scrollToBottom = () => {
    var object = this.refs.messageBox;
    if (object)
      object.scrollTop = object.scrollHeight;
  }

  componentDidUpdate() {
    if (this.state.error) {
      throw new Error('Unable to connect to chat room server.');
    }
    else {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.getChatHistory();

    this.setState({
      curTime: new Date().toLocaleString()
    })

    this.timerID = setInterval(
      () => this.state.bellRing ? this.setState({
        bellRing: false
      }) : "",
      10000
    );

  }
  render() {
    const { chatHistory } = this.state;
    return (
      <div>
        <br/><br/>
        {this.state.channelConnected ?
          (
            <div>
              {/* 왼쪽 사이드 */}
              <Paper elevation={5}>
                <Aside roomNotification={this.state.roomNotification}
                  openNotifications={this.state.openNotifications}
                  username={this.state.username}
                  broadcastMessage={this.state.broadcastMessage} />            
              </Paper>         

              <div>
                {/* 채팅창 메인 */}
                <Paper elevation={5} style = {{ display: 'flex' }}>
                  <ul id="chat" ref="messageBox">
                  {chatHistory && chatHistory.map((chat) =>
                  <li className="others">
                        <div className="entete">
                          <h2><img src={userImage} alt="Default-User" className="avatar" />
                            <span> </span>
                            <span className="sender"> {chat.message_sender_id} </span></h2>
                          <span> </span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                          {chat.message}
                        </div>
                      </li>

                    )}
                  <div style = {{ color: 'gray', marginLeft: '280px' }}> ~여기까지 읽으셨습니다.~ </div>
                  {this.state.broadcastMessage.map((msg, i) =>
                    this.state.username === msg.sender ?
                      <li className="you" key={i}>
                        <div className="entete">
                          <h2><img src={userImage} alt="Default-User" className="avatar" />
                            <span> </span>
                            <span className="sender"> {msg.sender} ~ (You)</span></h2>
                          <span> </span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                          {msg.message}
                        </div>
                        <div><h3>{msg.dateTime}</h3></div>
                      </li>
                      :
                      <li className="others">
                        <div className="entete">
                          <span> </span>
                          <img src={userImage} alt="Default-User" className="avatar" />
                          <span> </span>
                          <span className="sender">{msg.sender}</span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                          {msg.message}
                        </div>
                        <div><h3>{msg.dateTime}</h3></div>
                      </li>
                  )}
                </ul>
                </Paper>
                {/* 메시지 입력 */}
                <Footer sendMessage={this.sendMessage} privateMessage={false} />
              </div>
            </div>


          ) : (
            <Login connect={this.connect} roomcode={this.state.roomcode} />
          )
        }
      </div>
    )
  }
}

export default ChatMessageBox;
