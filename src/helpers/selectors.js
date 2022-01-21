
 function getAppointmentsForDay(state,day) {
  let appointmentsForDay;
  let result = [];
  for(let dayOfTheWeek of state.days){
    if(dayOfTheWeek.name === day){
      appointmentsForDay = dayOfTheWeek.appointments;
    }
  }
  if(!appointmentsForDay){
    return [];
  }
  for(let appointmentObj of Object.values(state.appointments)){
    if(appointmentsForDay.includes(appointmentObj.id)){
      result.push(appointmentObj);
    }
  }
  return result;
}


function getInterview(state,interview){
  if(!interview){
    return null;
  }
  for(let interviewer of Object.values(state.interviewers)){
    if(interviewer.id === interview.interviewer){
      interview.interviewer = interviewer;
    }
  }
  return interview;
 }

module.exports = {getAppointmentsForDay, getInterview}