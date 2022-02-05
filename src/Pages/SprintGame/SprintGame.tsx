import React, { useState, useEffect } from 'react';
import { WordFromCollection } from './words';
import { shuffledWords, randomAnswer, showEnglishWord, showTranslate, WordString, handleClick, ShowButtons } from './util';
import { WORDS_MAX, TIMER_TIME, SOUND_ICON, FULL_SCREEN_ICON, CLOSE_ICON } from './const';
import Timer from './timer';

const currentWords: WordFromCollection[] = shuffledWords();
const correctWords: WordFromCollection[] = [];
const wrongWords: WordFromCollection[] = [];
const answers: string[] = randomAnswer(currentWords);


function SprintGame() {
  return (
    <><SprintButtons /><SprintGameInside /></>
    // <><SprintButtons /><SprintGameInside words={currentWords}/></>
  )
}

const SprintGameInside = () => {

  const [timeLeft, setTimeLeft] = useState(TIMER_TIME);
  const [wordNum, setWordNum] = useState(0)
  const [count, setCount] = useState(0);
  const [maxSeries, setMaxSeries] = useState(0)
  const realAnswer = (currentWords[wordNum].wordTranslate === answers[wordNum]);
  console.log(wordNum);

  useEffect(() => {
    const keyPress = (event: { keyCode: number; }) => {
      if (event.keyCode === 39) { //right
        handleClick(correctWords, wrongWords, realAnswer, true, count, setCount, maxSeries, setMaxSeries, currentWords, wordNum, setWordNum);
      }
      else if (event.keyCode === 37) { //left
        handleClick(correctWords, wrongWords, realAnswer, false, count, setCount, maxSeries, setMaxSeries, currentWords, wordNum, setWordNum);
      }
    }
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [count, maxSeries, realAnswer, setWordNum, wordNum]);


  return (
    <div>
      {(timeLeft === 0 || wordNum === WORDS_MAX) && ResultsPage()}
      {(timeLeft > 0 && wordNum < WORDS_MAX) && <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />}
      {(timeLeft > 0 && wordNum < WORDS_MAX) && SprintQuestions(wordNum, setWordNum, count, setCount, maxSeries, setMaxSeries, realAnswer)}
    </div>
  )
}

const SprintQuestions = (wordNum: number, setWordNum: React.Dispatch<React.SetStateAction<number>>, count: number, setCount: React.Dispatch<React.SetStateAction<number>>, maxSeries: number, setMaxSeries: React.Dispatch<React.SetStateAction<number>>, realAnswer: boolean) => {


  return (
    <div>
      <h3>Текущий результат: {count}</h3>
      <p>Угадано подряд: {maxSeries}</p>

      <div>
        {showEnglishWord(currentWords, wordNum)}
        {showTranslate(answers[wordNum])}
        {ShowButtons(correctWords, wrongWords, currentWords, wordNum, setWordNum, count, setCount, maxSeries, setMaxSeries, realAnswer)}
      </div>
    </div>
  )
}

const ResultsPage = () => {

  console.log('results')
  const correctWordsElements = correctWords.map(word =>
    <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} id={word.id} />
  )

  const wrongWordsElements = wrongWords.map(word =>
    <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} id={word.id} />
  )

  return (
    <div>
      <ul>
        <p>correct</p>
        {correctWordsElements}
        <p>wrong</p>
        {wrongWordsElements}
      </ul>
    </div>
  )
}

const SprintButtons = () => {
  return (
    <div>
      {CLOSE_ICON}
      {FULL_SCREEN_ICON}
      {SOUND_ICON}
    </div>
  )
}

export default SprintGame;
