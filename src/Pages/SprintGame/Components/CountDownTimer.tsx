import React, { useEffect } from 'react';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type CountDownTimerPropsType = {
  initialValue: number;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>
}

const CountDownTimer: React.FC<CountDownTimerPropsType> = ({ initialValue, setIsDone }) => {
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
  let inside;
  if (initialValue < 10) {
    inside = <h3 className='sprint__count-down_small'>{value}</h3>;
  } else inside = <CircularProgressbar value={value} maxValue={initialValue} text={`${value}`}
    styles={buildStyles({
      textSize: '2.5em',
      pathColor: `#68d4bb`,
      textColor: '#68d4bb',
      
      // trailColor: '#d6d6d6',
      // backgroundColor: '#3e98c7',
    })} />

  return (
    inside
  )
}

export default CountDownTimer;