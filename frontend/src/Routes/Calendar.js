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

export default function CalendarApp () {
  const [events, setEvent] = useState([]);          // 전체 자격증 데이터
  const [eventsData, setEventsData] = useState([]); // 검색을 위한 전체 자격증 데이터 클로닝
  const [userInput, setUserInput] = useState('');   // 검색 userInput값

  const [modalShow, setModalShow] = useState(false);
  let [eventData, setEventData] = useState({});   // 클릭 시 개별 자격증 데이터
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/certificate/schedule')
    .then((res)=> {
      const data = res.data;
      let dataLists = [];
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
      setEventsData([...dataLists])
      })
      .catch((err) => {console.log(err)})
  }, [])

  function getEvent(arg) {
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
    console.log("useEffect function 작동")
    res.then((res2) => {
      // console.log('res2: ',res2)
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
    <>
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
      />: <></>}
    </>
  )
}