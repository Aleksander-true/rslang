import React, { useEffect } from 'react';
import { useState } from 'react';

type CountDownTimerPropsType = {
    initialValue: number; 
    setIsDone: React.Dispatch<React.SetStateAction<boolean>> 
}

const CountDownTimer:React.FC<CountDownTimerPropsType> = ({ initialValue, setIsDone }) => {
 const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const timer = setInterval(() => {
      if (value > 1) {
        setValue((prev) => prev - 1);
      }
      if (value === 1) {
        clearInterval(timer)
        setIsDone(true)
      }
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <h3>{value}</h3>
  )
}

export default CountDownTimer;