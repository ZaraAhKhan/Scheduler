import { useState, useEffect } from "react";

import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      // axios.get("/api/debug/reset")
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
    // console.log(appointments);
    // console.log("before setState", state);
    // console.log("state after setState in bookInterview", state);
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({...state,appointments});
      
      updateSpots(state, appointments, id);
    });
  }
  console.log("State outside", state);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({...state,appointments});
      
      updateSpots(state, appointments, id);
    });
  };

  const updateSpots = function (state, appointments, id) {
      console.log(appointments);

    // return days;
  };
  return { state, setDay, bookInterview, cancelInterview, useEffect };
}
