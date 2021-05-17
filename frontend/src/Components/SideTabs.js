import React, { useEffect, useState } from "react";
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import ChatRooms from './aside/ChatMessageBox/ChatRooms';
import axios from 'axios';

export default function SideTabs () {
  const [key, setKey] = useState('chat');
  const [favoriteList, setFavorite] = useState([]);
  const [JWTtoken, setJWTtoken] = useState(
    localStorage.token ? localStorage.token: '')
  useEffect(() => {
    const API = process.env.REACT_APP_API_URL;
    let instance = axios.create({ 
        baseURL: API,
        timeout: 1000,
        headers: { 
          'content-type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*' 
        }, 
        withCredentials: true, 
      }
    );
    instance.defaults.headers.common['Authorization'] = `${JWTtoken}`;
    // 즐겨찾기 목록 GET
    instance.get(`favorite/`,{ crossdomain: true })
    .then((res) => {
      console.log('즐겨찾기: ', res.data);
    })
    .catch((err) => {console.log('AXIOS 에러', err)})
    // axios.get(API+'/favorite', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   proxy: {
    //     host: API,
    //     port: 8080
    //   }
    // }).then((res) => {
    //   console.log('SUCCESS ===>', res.data)
    //   setFavorite(res.data);
    // }).catch((err) => {

    // })
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