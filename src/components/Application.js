import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import axios from "axios";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { tsNumberKeyword } from "@babel/types";

export default function Application(props) {
  //Combining states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      axios.get("/api/debug/reset")
    ]).then((all) => {
      const [first, second, third] = all;
      setState((prev) => ({
        ...prev,
        days: first.data,
        appointments: second.data,
        interviewers:third.data
      }));
    });
  }, []);

  //get array of appointments for the day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("Daily app" , dailyAppointments);

  // get the array of interviewers for the day
  const interviewersForDay = getInterviewersForDay(state,state.day);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: {...interview} 
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    setState({  
      ...state,
     appointments 
    });
    
    axios.put(`/api/appointments/${id}`,appointment)
    .then((res) => {
      console.log(res);
      setState( prev => ({...prev, appointments }));
      return true;
    })
    .catch(err => console.log(err.message));
  }
  console.log(state);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("Interview",interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
      />
      
    );
  });

  

  // Using spread operator to create new object and change the state of day/days
  const setDay = (day) => setState({ ...state, day });
  

  

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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
