import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  //Combining states

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Using spread operator to create new object and change the state of day/days
  const setDay = (day) => setState({ ...state, day });

  // make HTTP requests for data and update the state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
     
    ]).then((all) => {
      const [first, second, third] = all;
      setState((prev) => ({
        ...prev,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      }));
    });
  }, []);

  // helper function for updateSpots
  const getSpotsForDay = function(dayObj,appointments) {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots ++;
      }
    }
    return spots;
  };

  // updates the number of spots when booking or cancelling appointments
  const updateSpots = function(state,appointments,id) {
    const dayObj = state.days.find(day => day.name === state.day);
    const spots = getSpotsForDay(dayObj,appointments);
    
    const newDays = state.days.map(day => day.name === state.day ? {...dayObj, spots} : day);
    return newDays;
  };

  

  //bookInterview makes HTTP request and updates local state
  function bookInterview(id, interview) {
    console.log("id in book Interview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }

      setState({
        ...state,
        appointments,
        days: updateSpots(state,appointments,id),
      });
    });
  }
  console.log("State outside", state);

  //cancels interview by making HTTP request and updates state
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({ ...state, appointments, days: updateSpots(state,appointments,id) });
    });
  };

  return { state, setDay, bookInterview, cancelInterview, useEffect };
}
