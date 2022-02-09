import React, { useEffect, useState } from 'react';
import LevelPage from './Components/LevelPage';
import SprintGameInside from './Components/SprintInside';
import SprintButtons from './Components/SprintButtons';
import Timer from './Components/Timer';
import './sprintStyles.css'

const SprintGame = () => {
  const [level, setLevel] = useState(0);
  const [timeToGo, setTimeToGo] = useState(3);

  return (
    <div className='sprint'><SprintButtons />
      <div className='sprint__main'>
        {!level && <LevelPage level={level} setLevel={setLevel} />}
        {(level && timeToGo !== 0) && <Timer timeLeft={timeToGo} setTimeLeft={setTimeToGo} />}
        {(level && timeToGo === 0) && <SprintGameInside level={level}/>}
      </div>
    </div>
  )
}

export default SprintGame;
