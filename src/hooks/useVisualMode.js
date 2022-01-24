import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode,setMode] = useState(initialMode);
  const [history,setHistory] = useState([initialMode]);

  function transition(newMode,replace = false) {
    setMode(newMode);
    const newHistory = [...history];
    if(replace){
      // newHistory.pop();
      newHistory[newHistory.length - 1] = newMode;
      setHistory(newHistory);
    } else {
      setHistory([...newHistory,newMode]);
    }
    
  }

  function back() {
    
    if(history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const lastMode = newHistory[newHistory.length - 1];
      setMode(lastMode);
      setHistory(newHistory);
    }
    
  }

  return { mode,transition,back };
}