function getAppointmentsForDay(state, day) {
  let dayArray = state.days.filter((dayOfTheWeek) => dayOfTheWeek.name === day);

  if (dayArray.length === 0) {
    return dayArray;
  }

  let result = Object.values(state.appointments).filter((appointmentObj) =>
    dayArray[0].appointments.includes(appointmentObj.id)
  );
  return result;
}

function getInterviewersForDay(state, day) {
  let dayArray = state.days.filter((dayOfTheWeek) => dayOfTheWeek.name === day);

  if (dayArray.length === 0) {
    return dayArray;
  }

  let result = Object.values(state.interviewers).filter((appointmentObj) =>
    dayArray[0].interviewers.includes(appointmentObj.id)
  );
  return result;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (let interviewer of Object.values(state.interviewers)) {
    if (interviewer.id === interview.interviewer) {
      interview.interviewer = interviewer;
    }
  }
  return interview;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
