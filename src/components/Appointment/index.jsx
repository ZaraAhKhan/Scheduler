import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING ="SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    console.log("calling book Interview", interview);
    props.bookInterview(props.id, interview);
    if (props.bookInterview(props.id, interview)) {
      transition(SHOW);
    }
  }

  function onDelete (id) {
    transition(CONFIRM);
  }

  function onConfirm (id) {
  transition(DELETING);
  props.cancelInterview(id);
  if(props.cancelInterview(id)){
    setTimeout(() => transition(EMPTY),1500);
  }
  }

  function onCancel() {
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} id={props.id} onDelete={onDelete}  />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={onConfirm} onCancel={onCancel} id={props.id}/>}
    </article>
  );
}
