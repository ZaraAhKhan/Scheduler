import React from "react";

export default function DayListItem(props) {
  const {name,spots,setDay} = props;

  const handleClick = () => setDay(name);
  
    return (
    <li onClick={handleClick}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}