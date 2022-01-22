import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode,setMode] = useState(initialMode);

  function transition(newMode) {
    setMode(newMode);
  }

  function back() {
    
  }

  return { mode,transition };
}