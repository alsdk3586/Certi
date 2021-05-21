import React, { useEffect, useState } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import ChatRooms from "./aside/ChatMessageBox/ChatRooms";
import CustomModal from './CustomModal';
import styled from 'styled-components';

export default function SideTabs({ data }) {
  const [key, setKey] = useState("favorite");
  const [modalShow, setModalShow] = useState(false);
  let [eventData, setEventData] = useState();   // 클릭 시 개별 자격증 데이터
  const [dateData, setDateData] = useState();
  const [title, setTitle] = useState();
  const Button = styled.button`
    background-color: transparent;
    border: none;
  `;
  
  function modalOpen(){
    if (modalShow) {
      setModalShow(false)
    } else {
      setModalShow(true)
    }
  }

  if (data.length === 0) {
    return (
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
      >
        <Tab eventKey="favorite" title="즐겨찾기">
          <ListGroup variant="flush">
            <ListGroup.Item>아직 즐겨찾기한 항목이 없습니다 😅 </ListGroup.Item>
          </ListGroup>
        </Tab>
        <Tab eventKey="chat" title="채팅">
          <ChatRooms />
        </Tab>
      </Tabs>
    );
  } else {
    return (
      <>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          justify
        >
          <Tab eventKey="favorite" title="즐겨찾기">
            {/* {favoriteList.length} */}
            <ListGroup variant="flush">
              {data.map((elem, i) => (
                <ListGroup.Item key={i}>
                  <Button onClick={() => {
                    console.log(elem);
                    setTitle(elem.certificateCode.certificateClassificationCode)
                    let a = new Object();
                    a.code = elem.certificateCode.certificateCode;
                    setEventData(a);
                    modalOpen();
                  }
                  }>{elem.certificateCode.certificateClassificationCode}</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
          <Tab eventKey="chat" title="채팅">
            <ChatRooms />
          </Tab>
        </Tabs>
        {modalShow ? 
          <CustomModal 
            show={modalShow} 
            onHide={() => modalOpen()}
            data={eventData}
            date={dateData}
            title={title}
          /> 
        : <></>}
      </>
    );
  }
}
