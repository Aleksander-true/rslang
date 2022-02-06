import React, { useState, useEffect } from 'react';
import { WordFromCollection } from './words';
import { shuffledWords, randomAnswer, showEnglishWord, showTranslate, } from './util';
import { WORDS_MAX, TIMER_TIME, SOUND_ICON, FULL_SCREEN_ICON, CLOSE_ICON } from './const';
import Button from '../../Components/Button';
import ResultsPage from './Components/Results';
import LevelPage from './Components/LevelPage';
import Timer from './Components/Timer';
import  './sprintStyles.css'


const currentWords: WordFromCollection[] = shuffledWords();
const correctWords: WordFromCollection[] = [];
const wrongWords: WordFromCollection[] = [];
const answers: string[] = randomAnswer(currentWords);


const SprintGame = () => {
  const [level, setLevel] = useState(0)
  const [timeToGo, setTimeToGo] = useState(3)
  return (
    <div className='sprint'><SprintButtons />
      <div className='sprint__main'>
      {!level && <LevelPage level={level} setLevel={setLevel}/>}
      {(level && timeToGo !==0) && <Timer timeLeft={timeToGo} setTimeLeft={setTimeToGo}/>}
      {(level && timeToGo ===0) && <SprintGameInside />}
      </div>
    </div>
  )
}

const SprintGameInside = () => {

  const [timeLeft, setTimeLeft] = useState(TIMER_TIME);
  const [wordNum, setWordNum] = useState(0)
  const [count, setCount] = useState(0);
  const [maxSeries, setMaxSeries] = useState(0)
  const realAnswer = (currentWords[wordNum].wordTranslate === answers[wordNum]);

  useEffect(() => {
    const keyPress = (event: { keyCode: number; }) => {
      if (wordNum > WORDS_MAX - 1) {
        return
      }

      if (event.keyCode === 39) { //right
        if (realAnswer) {
          setCount(prev => prev + 1);
          setMaxSeries(prev => prev + 1);
          correctWords.push(currentWords[wordNum]);
          setWordNum(prev => prev + 1);
        } else {
          setMaxSeries(0)
          wrongWords.push(currentWords[wordNum]);
          setWordNum(prev => prev + 1);
        }
      }
      else if (event.keyCode === 37) {
        if (!realAnswer) {
          setCount(prev => prev + 1);
          setMaxSeries(prev => prev + 1);
          correctWords.push(currentWords[wordNum]);
          setWordNum(prev => prev + 1);
        } else {
          setMaxSeries(0)
          wrongWords.push(currentWords[wordNum]);
          setWordNum(prev => prev + 1);
        }
      }
    }
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [count, maxSeries, realAnswer, setWordNum, wordNum]);


  return (
    <div>
      {(timeLeft === 0 || wordNum === WORDS_MAX) && <ResultsPage correctWords={correctWords} wrongWords={wrongWords} />}
      {(timeLeft > 0 && wordNum < WORDS_MAX) && <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />}
      {(timeLeft > 0 && wordNum < WORDS_MAX) && <SprintQuestions wordNum={wordNum} setWordNum={setWordNum} count={count} setCount={setCount} maxSeries={maxSeries} setMaxSeries={setMaxSeries} realAnswer={realAnswer} />}
    </div>
  )
}

type SprintQuestionsPropsType = {
  wordNum: number;
  setWordNum: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  maxSeries: number;
  setMaxSeries: React.Dispatch<React.SetStateAction<number>>;
  realAnswer: boolean
}

const SprintQuestions: React.FC<SprintQuestionsPropsType> = ({ wordNum, setWordNum, count, setCount, maxSeries, setMaxSeries, realAnswer }) => {

  const handleClick = (userAnswer: string) => {

    if (JSON.parse(userAnswer) === realAnswer) {
      setCount(prev => prev + 1);
      setMaxSeries(prev => prev + 1);
      correctWords.push(currentWords[wordNum]);
      setWordNum(prev => prev + 1);
    } else {
      setMaxSeries(0)
      wrongWords.push(currentWords[wordNum]);
      setWordNum(prev => prev + 1);
    }
  }

  return (
    <div>
      <h3>Текущий результат: {count}</h3>
      <p>Угадано подряд: {maxSeries}</p>

      <div>
        {showEnglishWord(currentWords, wordNum)}
        {showTranslate(answers[wordNum])}
        <Button title='no' onClick={handleClick} type='danger' action='false' />
        <Button title='yes' onClick={handleClick} type='success' action='true' />
      </div>
    </div>
  )
}

const SprintButtons = () => {
  return (
    <div className='sprint__header' >
      {CLOSE_ICON}
      <div className='sprint__header__controls'>
      {FULL_SCREEN_ICON}
      {SOUND_ICON} </div>
    </div>
  )
}

export default SprintGame;
