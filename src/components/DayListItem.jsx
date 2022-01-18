import React from "react";
import 'components/DayListItem.scss'
import classNames from 'classnames';

export default function DayListItem(props) {
  const {name,spots,setDay} = props;

  const handleClick = () => setDay(name);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (spots === 0)
  });
  
    return (
    <li onClick={handleClick} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}