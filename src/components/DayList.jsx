import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayArray = days.map((eachDay) => (
    <DayListItem
      key={eachDay.id}
      {...eachDay}
      setDay={() => onChange(eachDay.name)}
      selected={eachDay.name === value}
    />
  ));

  return <ul>{dayArray}</ul>;
}
