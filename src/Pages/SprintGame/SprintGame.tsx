import React, { useEffect, useState } from 'react';
import LevelPage from './Components/LevelPage';
import SprintButtons from './Components/SprintButtons';
import './sprintStyles.css'
import CountDownTimer from './Components/CountDownTimer';
import getWords, { WordFromCollection } from './WordsAPI';
import SprintGameStart from './Components/SprintStart';

const SprintGame = (currentLevel?: number, currentPage?: number) => {
  const [isDone, setIsDone] = useState(false);
  const [level, setLevel] = useState(0);
  const [currentWords, setCurrentWords] = useState<WordFromCollection[]>([]);
  const [page, setPage] = useState(-1);
  
  useEffect(() => {
  if (currentPage && currentPage>=0) {
    console.log(currentPage);
    setPage(currentPage);
  }
  if (currentLevel && currentLevel>=0) {
    console.log(currentLevel);
    setLevel(currentLevel);
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
        {!level ? <LevelPage level={level} setLevel={setLevel} /> : null}
        {(level && !isDone) ? <CountDownTimer initialValue={3} setIsDone={setIsDone} /> : null}
        {(level && isDone) ? <SprintGameStart currentWords={currentWords} level={level} page={page}  /> : null}
      </div>
    </div>
  )
}

export default SprintGame