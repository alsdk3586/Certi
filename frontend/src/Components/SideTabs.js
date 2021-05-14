import React, { useEffect, useState } from "react";
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import ChatRooms from './aside/ChatMessageBox/ChatRooms';
import axios from 'axios';

export default function SideTabs () {
  const [key, setKey] = useState('chat');
  const [favoriteList, setFavorite] = useState([]);
  const [token, setToken] = useState(
    localStorage.token ? localStorage.token: '')
  useEffect(() => {
    const API = process.env.REACT_APP_API_URL;
    // axios.get(`API/favorite/`)
    // .then((res) => {

    // })
    // .catch((err) => {console.log(err)})
  }, [])

  if (favoriteList.length === 0) {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
      >
        <Tab eventKey="chat" title="채팅">
          <ChatRooms />
        </Tab>
        <Tab eventKey="favorite" title="즐겨찾기">
          <ListGroup variant="flush">
            <ListGroup.Item>아직 즐겨찾기한 항목이 없습니다 😅 </ListGroup.Item>
          </ListGroup>
        </Tab>
      </Tabs>
    );
  } else {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
      >
        <Tab eventKey="chat" title="채팅">
          <ChatRooms />
        </Tab>
        <Tab eventKey="favorite" title="즐겨찾기">
          <ListGroup variant="flush">
            {favoriteList.map((elem)=> (
            <ListGroup.Item>{elem}</ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    );
  }  
}