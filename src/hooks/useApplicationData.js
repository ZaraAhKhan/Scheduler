import { useState,useEffect } from "react";

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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        if (process.env.TEST_ERROR) {
          setTimeout(() => res.status(500).json({}), 1000);
          return;
        }
        setState((prev) => ({ ...prev, appointments }));
        return res;
      })
      
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const cancelInterview = function (id) {
    return axios
      .delete(`/api/appointments/${id}`, dailyAppointments)
      .then((res) => {
        if (process.env.TEST_ERROR) {
          setTimeout(() => res.status(500).json({}), 1000);
          return;
        }
        const toBeDeleted = dailyAppointments.find(
          (appointment) => (appointment.id = id)
        );
        toBeDeleted.interview = null;
        return res;
      })
  };
  return ({state,setDay,bookInterview,cancelInterview,useEffect});
}