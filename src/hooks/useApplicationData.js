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

  function updateSpots(requestType, id) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (
          requestType === "bookAppointment" &&
          !state.appointments[id].interview
        ) {
          return { ...day, spots: day.spots - 1 };
        } else if (!requestType) {
          return { ...day, spots: day.spots + 1 };
        } else {
          return { ...day };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  }

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
        days: updateSpots("bookAppointment", id),
      });
    });
  }
  console.log("State outside", state);

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
      setState({ ...state, appointments, days: updateSpots() });
    });
  };

  return { state, setDay, bookInterview, cancelInterview, useEffect };
}
