import { useEffect, useState } from "react"

const ProgressBar = ({ value }) => {
  const [percentage, setPercentage] = useState(value);

  useEffect(() => {
    setPercentage(Math.min(100, value));
  }, [value])

  return (
    <div className="progress">
        <span>{percentage}%</span>
        <div 
            style={{ width: `${percentage}%` }}
        />
    </div>
  )
}
export default ProgressBar