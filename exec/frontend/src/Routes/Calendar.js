import React, { Component, useState, useEffect } from "react";
import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import CustomModal from '../Components/CustomModal';
import SidebarTab from '../Components/SidebarTab';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import Loader from '../Components/Loader';
import SearchBox from '../Components/SearchBox';
import { favoriteApi } from "../utils/axios";
import { Link } from "react-router-dom";
import dotenv from 'dotenv';

export default function CalendarApp () {
  const [events, setEvent] = useState([]);          // 전체 자격증 데이터
  const [eventsData, setEventsData] = useState([]); // 검색을 위한 전체 자격증 데이터 클로닝
  const [userInput, setUserInput] = useState('');   // 검색 userInput값

  const [modalShow, setModalShow] = useState(false);
  let [eventData, setEventData] = useState();   // 클릭 시 개별 자격증 데이터
  const [favoriteList, setFavoriteList] = useState([]);
  const [title, setTitle] = useState();
  const [dateData, setDateData] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'certificate/schedule')
    .then((res)=> {
      const data = res.data;
      let dataLists = [];
      data.forEach(elem => {
        let docRegStart = {
          title: elem.certificateCode.certificateClassificationCode+ `필기 원서 시작일`,
          code: elem.certificateCode.certificateCode,
          date: elem.scheduleDocRegStartDt,
          id: '필기접수시작'
        }
        let docRegEnd = {
          title: elem.certificateCode.certificateClassificationCode + `필기 원서 마감일`,
          code: elem.certificateCode.certificateCode,
          date: elem.scheduleDocRegEndDt,
          id: '필기접수끝'
        }
        let docExamStart = {
          title: elem.certificateCode.certificateClassificationCode + `필기 시험 시작일`,
          code: elem.certificateCode.certificateCode,
          date: elem.scheduleDocExamStartDt,
          id: '필기시험시작'
        }
        let docExamEnd = {
          title: elem.certificateCode.certificateClassificationCode + `필기 시험 마감일`,
          code: elem.certificateCode.certificateCode,
          date: elem.scheduleDocExamEndDt,
          id: '필기시험끝'
        }
        let docExamPass = {
          title: elem.certificateCode.certificateClassificationCode + `필기 시험 합격발표`,
          code: elem.certificateCode.certificateCode,
          date: elem.scheduleDocPassDt,
          id: '필기합격'
        }
        let pracRegStart = {
          title: elem.certificateCode.certificateClassificationCode + `실기 원서 시작일`,
          code: elem.certificateCode.certificateCode,
          date: elem.schedulePracRegStartDt,
          id: '실기접수시작'
        }
        let pracRegEnd = {
          title: elem.certificateCode.certificateClassificationCode + `실기 원서 마감일`,
          code: elem.certificateCode.certificateCode,
          date: elem.schedulePracRegEndDt,
          id: '실기접수끝'
        }
        let pracExamStart = {
          title: elem.certificateCode.certificateClassificationCode + `실기 시험 시작일`,
          code: elem.certificateCode.certificateCode,
          date: elem.schedulePracExamStartDt,
          id: '실기시험시작'
        }
        let pracExamEnd = {
          title: elem.certificateCode.certificateClassificationCode + `실기 시험 마감일`,
          code: elem.certificateCode.certificateCode,
          date: elem.schedulePracExamEndDt,
          id: '실기시험끝'
        }
        let pracExamPass = {
          title: elem.certificateCode.certificateClassificationCode + `실기 시험 합격발표`,
          code: elem.certificateCode.certificateCode,
          date: elem.schedulePracPassDt,
          id: '실기합격'
        }
        let dataList = [docRegStart, docRegEnd, docExamStart, docExamEnd, docExamPass, pracRegStart, pracRegEnd, pracExamStart, pracExamEnd, pracExamPass];
        dataLists = [...dataList, ...dataLists]
      });
      setEvent([...dataLists])
      setEventsData([...dataLists])
      })
      .catch((err) => {console.log(err)})
  }, [])

  function getEvent(arg) {
    setTitle(arg.event.title)
    setDateData(arg.event.startStr)
    setEventData(arg.event._def.extendedProps);
    modalOpen();
  }
  function modalOpen(){
    if (modalShow) {
      setModalShow(false)
    } else {
      setModalShow(true)
    }
  }
  // 검색
  function searchUser (e) {
    setUserInput(e.target.value);
  };

  function filterUser () {
    const filterEventsData = eventsData.filter((data) => {
      return data.title.includes(userInput);
    });
    setEvent(filterEventsData);
  };
  // 즐겨찾기 목록
  useEffect (() => {
    const res = favoriteApi.getFavoritelist();
    res.then((res2) => {
      let tmp = [];
      res2.map((data) => {
        if (data.certificateCode !== null) {
          tmp.push(data)
        }
      })
      setFavoriteList(tmp)
    })
  }, [])

  return (
    <div style={{padding :"20px"}}>
      {events.length !== 0 ?
      <Row>
          <Col md={10}>
            <div className="search-box">
              <SearchBox
                handleChange={searchUser}
              />
              <Button variant="outline-success" onClick={filterUser} className="d-flex" 
              style={{ marginBottom: "10px"}}>검색</Button>
          </div>
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            locale="ko"
            timeZone="Asia/Seoul"
            initialView="dayGridMonth"
            eventClick={getEvent}
            events={events}
            eventDisplay="list-item"
            dayMaxEventRows={12}
            eventContent={renderEventContent}
          /> 
        </Col>
        <Col md={2}>
          <SidebarTab width={300} height={500} data={favoriteList}/>
        </Col>
      </Row>
      : <Loader />}
      {modalShow ? <CustomModal 
        show={modalShow} 
        onHide={() => modalOpen()}
        data={eventData}
        date={dateData}
        title={title}
      />: <></>}
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      {eventInfo.event.id.includes('시작') ?
        <>
          <div class=".fc-daygrid-event-dot" style={{borderRadius: "4px", border : "4px solid blue"}}></div>
          <div class=".fc-event-title">{eventInfo.event.title}</div>
        </>
        :
        <>
          <div class=".fc-daygrid-event-dot" style={{borderRadius: "4px", border : "4px solid #ff5f2e"}}></div>
          <div class=".fc-event-title">{eventInfo.event.title}</div>
        </> 
      }
    </>
  )
}