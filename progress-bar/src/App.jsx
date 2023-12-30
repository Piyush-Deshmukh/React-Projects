import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue((prevValue) => prevValue + 1);
    }, 100)
  }, [])


  return (
    <div className="app">
      <h1>Progress Bar</h1>
      <ProgressBar value={value} />
    </div>
  )
}

export default App
