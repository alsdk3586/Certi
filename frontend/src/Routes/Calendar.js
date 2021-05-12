import React, { Component, useState, useEffect } from "react";
import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import CustomModal from '../Components/CustomModal';
import SidebarChat from '../Components/SidebarChat';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

export default function CalendarApp () {
  const [events, setEvent] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  let [eventData, setEventData] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:8080/certificate/schedule')
    .then((res)=> {
      const data = res.data;
      let dataLists = [];
      if (events.length === 0) {
        data.forEach(elem => {
          let docRegStart = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.scheduleDocRegStartDt,
            type: '필기접수시작'
          }
          let docRegEnd = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.scheduleDocRegEndDt,
            type: '필기접수끝'
          }
          let docExamStart = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.scheduleDocExamStartDt,
            type: '필기시험시작'
          }
          let docExamEnd = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.scheduleDocExamEndDt,
            type: '필기시험끝'
          }
          let docExamPass = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.scheduleDocPassDt,
            type: '필기합격'
          }
          let pracRegStart = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.schedulePracRegStartDt,
            type: '실기시험시작'
          }
          let pracRegEnd = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.schedulePracRegEndDt,
            type: '실기시험시작'
          }
          let pracExamStart = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.schedulePracExamStartDt,
            type: '실기시험시작'
          }
          let pracExamEnd = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.schedulePracExamEndDt,
            type: '실기시험끝'
          }
          let pracExamPass = {
            title: elem.certificateCode.certificateClassificationCode,
            code: elem.certificateCode.certificateCode,
            date: elem.schedulePracPassDt,
            type: '실기합격'
          }
          let dataList = [docRegStart, docRegEnd, docExamStart, docExamEnd, docExamPass, pracRegStart, pracRegEnd, pracExamStart, pracExamEnd, pracExamPass];
          dataLists = [...dataList, ...dataLists]
        });
        setEvent([...dataLists])
        }
      })
      .catch((err) => {console.log(err)})
  })

  function getEvent(arg) {
    setEventData(eventData = arg.event._def.extendedProps);
    modalOpen();
  }

  function modalOpen(){
    if (modalShow) {
      setModalShow(false)
    } else {
      setModalShow(true)
    }
  }
  return (
    <>
      <Row>
        <Col md={9}>  
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            locale="ko"
            timeZone="Asia/Seoul"
            initialView="dayGridMonth"
            eventClick={getEvent}
            events={events}
            eventDisplay="list-item"
            dayMaxEventRows={8}
          />
        </Col>
        <Col md={3}>
          <SidebarChat width={300} height={500} />
        </Col>
      </Row>
      <CustomModal 
        show={modalShow} 
        onHide={() => modalOpen()}
        data={eventData}
      />
    </>
  )
}