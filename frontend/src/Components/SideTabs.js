import React, { useEffect, useState } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import ChatRooms from "./aside/ChatMessageBox/ChatRooms";

export default function SideTabs({ data }) {
  const [key, setKey] = useState("chat");

  if (data.length === 0) {
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
          {/* {favoriteList.length} */}
          <ListGroup variant="flush">
            {data.map((elem, i) => (
              <ListGroup.Item key={i}>
                {elem.certificateCode.certificateClassificationCode}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    );
  }
}
