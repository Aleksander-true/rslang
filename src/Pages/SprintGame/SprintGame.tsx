import React, { useState } from 'react';
import { WordFromCollection } from './words';
import { shuffledWords, randomAnswer,} from './util';
import LevelPage from './Components/LevelPage';
import SprintGameInside from './Components/SprintInside';
import SprintButtons from './Components/SprintButtons';
import Timer from './Components/Timer';
import './sprintStyles.css'

const currentWords: WordFromCollection[] = shuffledWords();
const answers: string[] = randomAnswer(currentWords) as string[];


const SprintGame = () => {
  const [level, setLevel] = useState(0)
  const [timeToGo, setTimeToGo] = useState(3)

  return (
    <div className='sprint'><SprintButtons />
      <div className='sprint__main'>
        {!level && <LevelPage level={level} setLevel={setLevel} />}
        {(level && timeToGo !== 0) && <Timer timeLeft={timeToGo} setTimeLeft={setTimeToGo} />}
        {(level && timeToGo === 0) && <SprintGameInside answers={answers} currentWords={currentWords}/>}
      </div>
    </div>
  )
}



export default SprintGame;
