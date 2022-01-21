import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  //Combining states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state,state.day)

  // Using spread operator to create new object and change the state of day/days
  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev,days}));

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`)
    ]).then((all) => {
      
      const [first,second] = all;
      console.log(first.data,second.data);
      setState(prev => ({...prev, days:first.data, appointments:second.data}))
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
