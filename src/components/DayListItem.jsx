import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay } = props;

  //format spots based on number of spots remaining
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  const spotsRemaining = formatSpots(spots);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li onClick={setDay} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
