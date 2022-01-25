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

  function updateSpots(id){
    axios.get('/api/days')
    .then((response) => {
      setState((prev) => ({...prev, days:response.data}))
    })
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
    // console.log(appointments);
    // console.log("before setState", state);
    // console.log("state after setState in bookInterview", state);
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({ ...state, appointments });

      updateSpots(id);
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
      setState({ ...state, appointments });

      updateSpots(id);
    });
  };

  // const updateSpots = function (state, appointments, id) {
  //   if (appointments[id].interview) {
  //     const newState = { ...state };
  //     const dayObj = newState.days.find((day) => day.appointments.includes(id));
  //     dayObj.spots = dayObj.spots - 1;
  //     const dayObjId = dayObj.id;
  //     newState.days.map((day) => {
  //       if (day.id === dayObjId) {
  //         day = dayObj;
  //       }
  //     });
  //     console.log("Post updateSpots",newState.days);
  //     return newState.days;
  //   } else if(!appointments[id].interview){
  //     const newState = { ...state };
  //     const dayObj = newState.days.find((day) => day.appointments.includes(id));
  //     dayObj.spots = dayObj.spots + 1;
  //     const dayObjId = dayObj.id;
  //     newState.days.map((day) => {
  //       if (day.id === dayObjId) {
  //         day = dayObj;
  //       }
  //     });
  //     console.log("Post updateSpots",newState.days);
  //     return newState.days;
  //   }
    
    
  // };
  return { state, setDay, bookInterview, cancelInterview, useEffect, updateSpots };
}
