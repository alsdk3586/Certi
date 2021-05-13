import React, { useState } from "react";
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import ChatMessageBox from './aside/ChatMessageBox/ChatMessageBox';

export default function SideTabs () {
  const [key, setKey] = useState('chat');
  const [favoriteList, setFavorite] = useState([]);

  if (favoriteList.length === 0) {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
      >
        <Tab eventKey="chat" title="채팅">
          <ChatMessageBox />
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
          <ChatMessageBox />
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