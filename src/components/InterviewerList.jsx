import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  console.log("Interviewers in InterviewList",interviewers);

  const interviewerArray = interviewers.map((eachInterviewer) => (
    <InterviewerListItem
      key={eachInterviewer.id}
      {...eachInterviewer}
      setInterviewer={() => onChange(eachInterviewer.id)}
      selected={eachInterviewer.id === value}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArray}</ul>
    </section>
  );
}
