import React from "react";

export default function DayListItem(props) {
  const {name,spots} = props;

  return (
    <li >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}