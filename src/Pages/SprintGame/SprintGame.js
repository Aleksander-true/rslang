import React, { useState, useEffect }  from 'react';
import { words } from './words';

const shuffledWords = () => {
  let arr = words.slice()
   arr.sort(()=>Math.random()-0.5)
   return arr
}

const currentWords = shuffledWords();
const WORDS_MAX = 20;
const correctWords = [];
const wrongWords = [];


function SprintGame () {
  return (
    <div>
    <SprintButtons/>
    <SprintStructure words={currentWords}/>
    </div>
  )
}

const SprintStructure = (props) => {
  const [count, setCount] = useState(0);
  const [maxSeries, setMaxSeries] = useState(0)
  const [wordNum, setWordNum] = useState(0)
  const translateAnswer = randomAnswer(props.words, wordNum)
  let timeLeft = 30;
  const realAnswer = (props.words[wordNum].wordTranslate === translateAnswer);

  useEffect(() => {
    const keyPress = (event) => {
        if (event.keyCode === 39) { //right
          handleClick(realAnswer, true, count, setCount, maxSeries, setMaxSeries, props.words, wordNum, setWordNum);}
        else if (event.keyCode === 37) { //left
          handleClick(realAnswer, false, count, setCount, maxSeries, setMaxSeries, props.words, wordNum, setWordNum);
        }
      }
    window.addEventListener('keydown', keyPress);
    return () => {
        window.removeEventListener('keydown', keyPress);
    };
  }, [count, maxSeries, realAnswer, wordNum, props.words]);

return (
  <div>
{wordNum < WORDS_MAX-1 && QuestionsPage(count, setCount, maxSeries, setMaxSeries, timeLeft, wordNum, setWordNum, translateAnswer, realAnswer)}
{wordNum === WORDS_MAX-1 && ResultsPage()}
</div>)
  
}

const QuestionsPage = (count, setCount, maxSeries, setMaxSeries, timeLeft, wordNum, setWordNum, translateAnswer, realAnswer) => {
  return (
  <div>
    <h3>Текущий результат: {count}</h3>
    <p>Угадано подряд: {maxSeries}</p>
    {showTimer(timeLeft)}
    <div>  
      {showEnglishWord(currentWords, wordNum)}
      {showTranslate(translateAnswer)}
      {ShowButtons(currentWords, wordNum, setWordNum, count, setCount, maxSeries, setMaxSeries, realAnswer)}
    </div>
  </div>
  )
}

const ResultsPage = () => {
  const correctWordsElements = correctWords.map(word =>
    <WordString englishWord = {word.word} russianWord = {word.wordTranslate} sound = {word.audio} id = {word.id}/>
   )
  
  const wrongWordsElements = wrongWords.map(word =>
    <WordString englishWord = {word.word} russianWord = {word.wordTranslate} sound = {word.audio} id = {word.id}/>
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

const WordString = (props) => {
 
  const englishWord = props.englishWord;
  const russianWord = props.russianWord;
  const soundURL = props.sound;
  const id = props.id
  return (
    <li key = {id}>
    <a href = {soundURL}>{SOUND_ICON} </a> 
    {englishWord}
     - 
    {russianWord} </li>
  )
}

const showTimer = (timeLeft) => {
return (
  <div>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
  </svg>
  <p>{timeLeft}</p>
  </div>
)
}

const showEnglishWord = (words, wordNum) => {
return (
<div>
  {words[wordNum].word}
</div>
)}

const showTranslate = (translateAnswer) => {
  return (
    <div>
      {translateAnswer}
    </div>
    )
}


const ShowButtons = (words, wordNum, setWordNum, count, setCount, maxSeries, setMaxSeries, realAnswer) => {
  return (
    <div>
      <button className= "btn btn-danger" onClick={() => handleClick(false, realAnswer, count, setCount, maxSeries, setMaxSeries, words, wordNum, setWordNum)}>Нет</button>
      <button className="btn btn-success" onClick={() => handleClick(true, realAnswer, count, setCount, maxSeries, setMaxSeries, words, wordNum, setWordNum)}>Да</button>
    </div>
  )
}

const handleClick = (userAnswer, realAnswer, count, setCount, maxSeries, setMaxSeries, words, wordNum, setWordNum) => {
    
  if (realAnswer === userAnswer) {
    setCount(count+1);
    setMaxSeries(maxSeries+1);
    correctWords.push(words[wordNum]);
  } else {
    setMaxSeries(maxSeries=0)
    wrongWords.push(words[wordNum]);
  }

  // if (wordNum<WORDS_MAX-1) {
    
  setWordNum(wordNum + 1);
  

}


const randomAnswer = (words, wordNum) => {
 if (Math.round(Math.random())) {
  
  return (words[wordNum].wordTranslate)
 } else {
   
  return (words[Math.floor(Math.random()*WORDS_MAX)].wordTranslate)
 }
}

const SprintButtons = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
       <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
      </svg>
    
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
      </svg>

      {SOUND_ICON}
    </div>
  )
}

const SOUND_ICON = <svg xml ns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16">
<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
<path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
</svg>


export default SprintGame;