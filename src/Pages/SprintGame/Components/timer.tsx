import React, { useEffect } from 'react';

const Timer = (props: { timeLeft: number; setTimeLeft: React.Dispatch<React.SetStateAction<number>> }) => {
 
  useEffect(() => {
    const timer = setInterval(() => {
      if (props.timeLeft > 0) {
        props.setTimeLeft((prev) => prev - 1);
      }
      if (props.timeLeft === 0) {
        clearInterval(timer)
      }
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <h3>{props.timeLeft}</h3>
  )
}

export default Timer;