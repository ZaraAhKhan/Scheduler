function getAppointmentsForDay(state, day) {
  let dayArray = state.days.find((dayOfTheWeek) => dayOfTheWeek.name === day);

  if (dayArray) {
    let result = dayArray.appointments.map((id) => state.appointments[id]);
    return result;
  } else {
    return [];
  }
}

function getInterviewersForDay(state, day) {
  let dayArray = state.days.find((dayOfTheWeek) => dayOfTheWeek.name === day);

  if (dayArray) {
    let result = dayArray.interviewers.map((id) => state.interviewers[id]);
    return result;
  } else {
    return [];
  }
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return interviewObj;
  // let interviewArray = Object.values(state.interviewers).filter(
  //   (interviewer) => interviewer.id === interview.interviewer
  // );
  // interview.interviewer = interviewArray[0];
  // return interview;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
