
 export function getAppointmentsForDay(state,day) {
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
