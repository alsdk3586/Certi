import React, { Component, useState } from "react";
import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import CustomModal from '../Components/CustomModal';

export default function CalendarApp () {
  const [events, setEvent] = useState([{ title: 'event 2', date: '2021-05-02' }]);
  const [modalShow, setModalShow] = useState(false);

  function modalOpen(){
    if (modalShow) {
      setModalShow(false)
    } else {
      setModalShow(true)
    }
  }

  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        eventClick={modalOpen}
        events={events}
        selectMirror={true}
      />

      <CustomModal show={modalShow} onHide={() => modalOpen()}/>
    </>
  )
}