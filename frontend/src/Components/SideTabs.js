import React, { useEffect, useState } from "react";
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import ChatRooms from './aside/ChatMessageBox/ChatRooms';
import { favoriteApi } from "../utils/axios";

export default function SideTabs () {
  const [key, setKey] = useState('chat');
  const [favoriteList, setFavorite] = useState([]);
  useEffect (() => {
    const res = favoriteApi.getFavoritelist();
    console.log("useEffect function 작동")
    res.then((res2) => {
      console.log(res2)
      // setFavorite(res2)
    })
  }, [favoriteList])

  if (favoriteList.length === 0) {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
      >
        <Tab eventKey="chat" title="채팅">
          {/* <ChatRooms /> */}
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
          {/* <ChatRooms /> */}
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