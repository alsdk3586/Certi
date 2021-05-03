import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class CalendarApp extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(2, "days").toDate(),
        title: "Some title1Some title1Some title1Some title1Some title1",
      },
      {
        start: moment().toDate(),
        end: moment().add(3, "days").toDate(),
        title: "Some title2",
      },
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title3",
      },
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title4",
      },
      {
        start: moment().toDate(),
        end: moment().add(5, "days").toDate(),
        title: "Some title5",
      },
      {
        start: moment().toDate(),
        end: moment().add(2, "days").toDate(),
        title: "Some titl6",
      },
      {
        start: moment().toDate(),
        end: moment().add(2, "days").toDate(),
        title: "Some titl7",
      },
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some titl8",
      },
      {
        start: moment().toDate(),
        end: moment().add(2, "days").toDate(),
        title: "Some titl9",
      },
      {
        start: moment().toDate(),
        end: moment().add(2, "days").toDate(),
        title: "Some titl10",
      }
    ],
  };
  onEventResize = (data) => {
    const { start, end } = data;
    
    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };
  
  render() {
    return (
      <div>
        <Calendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default CalendarApp;