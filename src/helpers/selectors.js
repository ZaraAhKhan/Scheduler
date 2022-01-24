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

  let interviewArray = Object.values(state.interviewers).filter(
    (interviewer) => interviewer.id === interview.interviewer
  );
  interview.interviewer = interviewArray[0];
  return interview;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
