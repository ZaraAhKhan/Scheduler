import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode,setMode] = useState(initialMode);
  const [history,setHistory] = useState([initialMode]);

  function transition(newMode,replace = false) {
    setMode(newMode);
    if(replace){
      history.pop();
    }
    setHistory(prev => ([...prev,newMode]));
  }

  function back() {
    history.pop();
    if(history.length) {
      setMode(() => ( history[history.length-1]));
    }
    
  }

  return { mode,transition,back };
}