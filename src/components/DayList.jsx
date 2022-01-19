import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const dayArray = days.map((eachDay) => (
    <DayListItem
      key={eachDay.id}
      {...eachDay}
      setDay={() => setDay(eachDay.name)}
      selected={eachDay.name === day}
    />
  ));

  return <ul>{dayArray}</ul>;
}
