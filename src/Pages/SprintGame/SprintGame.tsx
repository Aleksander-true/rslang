import React, { useEffect, useState } from 'react';
import LevelPage from './Components/LevelPage';
import SprintButtons from './Components/SprintButtons';
import './sprintStyles.css'
import CountDownTimer from './Components/CountDownTimer';
import getWords, { WordFromCollection } from './WordsAPI';
import SprintGameStart from './Components/SprintStart';
import whatWords from '../../Components/whatWords';

const SprintGame = () => {
  const [isDone, setIsDone] = useState(false);
  const [level, setLevel] = useState(0);
  const [currentWords, setCurrentWords] = useState<WordFromCollection[]>([]);
  const [page, setPage] = useState(-1);
  
  useEffect(() => {
  if (whatWords.page) {
    console.log(whatWords.page);
    setPage(+whatWords.page);
  }
  if (whatWords.level) {
    console.log(whatWords.level);
    setLevel(+whatWords.level + 1);
  }
}, [])

  const loadWords = async (selectedLevel: number) => {
    
      const myWords = await getWords((selectedLevel - 1).toString(), page.toString());
      setCurrentWords(myWords || []);
  }

  useEffect(() => {
    if (level) {
      loadWords(level)
    }
  }, [level])


  return (
    <div className='sprint'><SprintButtons />
      <div className='sprint__main'>
        {!level ? <LevelPage setLevel={setLevel} /> : null}
        {(level && !isDone) ? <CountDownTimer initialValue={3} setIsDone={setIsDone} /> : null}
        {(level && isDone) ? <SprintGameStart currentWords={currentWords} level={level} page={page}  /> : null}
      </div>
    </div>
  )
}

export default SprintGame