import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerArray = interviewers.map((eachInterviewer) => (
    <InterviewerListItem
      key={eachInterviewer.id}
      {...eachInterviewer}
      setInterviewer={() => setInterviewer(eachInterviewer.id)}
      selected={eachInterviewer.id === interviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArray}</ul>
    </section>
  );
}
