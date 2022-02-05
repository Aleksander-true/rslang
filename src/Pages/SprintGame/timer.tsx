import React, { useEffect }  from 'react';

// const Timer = (props:any) => {
//     const initialSeconds = props.time;
//     const setTime = props.setTime;
    
//     const [seconds, setSeconds ] =  useState(initialSeconds);
//     useEffect(()=>{
//     let myInterval = setInterval(() => {
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//                 setTime(seconds-1)
//             }
//             if (seconds === 0) {
//                 clearInterval(myInterval)
//             } 
//         }, 1000)
//         return ()=> {
//             clearInterval(myInterval);
//           };
//     });

//     return (
// <div>
//   { seconds === 0
//     ? null
//     : <h3> {seconds < 10 ?  `0${seconds}` : seconds}</h3> 
//   }
// </div>
//     )
// }


const Timer = (timeLeft:number, setTimeLeft:React.Dispatch<React.SetStateAction<number>>) => {
  useEffect(() => {
    const timer = setInterval(() => {
     if (timeLeft > 0) {
       setTimeLeft(timeLeft - 1);
     }
     if (timeLeft === 0) {
       clearInterval(timer)
     } 
   }, 1000)
   return ()=> {
    clearInterval(timer);
   };
   });
  
   return (
     <h3>{timeLeft}</h3>
   )
  }

export default Timer;