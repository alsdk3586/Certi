import React, { Component, useState } from "react";
import FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import CustomModal from '../Components/CustomModal';

export default function CalendarApp () {
  const [events, setEvent] = useState(
    [
      { title: 'event 1', 
        date: '2021-05-02', 
        data: {
          startDt: '2021-05-02',
          endDt: '2021-05-03',
          acceptancerate_result: 0.3,
          acceptancerate_doc: 0.8,
          acceptancerate_prac: 0.5
        }
      },
      { title: 'event 2', date: '2021-05-04',
        data: {
          startDt: '2021-05-02',
          endDt: '2021-05-03',
          acceptancerate_result: 0.3,
          acceptancerate_doc: 0.8,
          acceptancerate_prac: 0.5
        }
      },
      { title: 'event 3', date: '2021-05-06',
        data: {
          startDt: '2021-05-02',
          endDt: '2021-05-03',
          acceptancerate_result: 0.3,
          acceptancerate_doc: 0.8,
          acceptancerate_prac: 0.5
        }
      },
      { title: 'event 4', date: '2021-05-08',
        data: {
          startDt: '2021-05-02',
          endDt: '2021-05-03',
          acceptancerate_result: 0.3,
          acceptancerate_doc: 0.8,
          acceptancerate_prac: 0.5
        }
      },
    ]
    );
  const [modalShow, setModalShow] = useState(false);
  let [eventData, setEventData] = useState({});

  function getEvent(arg) {
    setEventData(eventData = arg.event._def.extendedProps.data);
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
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        locale="ko"
        timeZone="Asia/Seoul"
        initialView="dayGridMonth"
        eventClick={getEvent}
        events={events}
        eventDisplay="list-item"
      />

      <CustomModal 
        show={modalShow} 
        onHide={() => modalOpen()}
        data={eventData}
      />
    </>
  )
}