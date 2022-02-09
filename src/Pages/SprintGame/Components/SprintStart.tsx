import React, { useEffect } from "react";
import { useState } from "react";
import { TIMER_TIME, WORDS_MAX } from "../const";
import { randomAnswer } from "../util";
import { WordFromCollection } from "../WordsAPI";
import ResultsPage from "./Results";
import SprintQuestions from "./SprintQuestions";
import Timer from "./Timer";


const SprintGameStart = (props: { level: number, currentWords: WordFromCollection[] }) => {
    const answers: string[] = randomAnswer(props.currentWords) as string[];
    const [timeLeft, setTimeLeft] = useState(TIMER_TIME);
    const [correctWords, setCorrectWords] = useState<WordFromCollection[]>([]);
    const [wrongWords, setWrongWords] = useState<WordFromCollection[]>([]);
    const wordNum = correctWords.length + wrongWords.length;

    useEffect(()=> {
      console.log(props.currentWords, 'SprintGameStart')
    })
  
    return (
      <div className='sprint__question-page'>
        {(timeLeft === 0 || wordNum === WORDS_MAX) ? <ResultsPage correctWords={correctWords} wrongWords={wrongWords} /> : null}
        {(timeLeft > 0 && wordNum < WORDS_MAX) ? <> <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
  
          <SprintQuestions setCorrectWords={setCorrectWords} setWrongWords={setWrongWords} answers={answers} currentWords={props.currentWords} />
  
        </> : null}
      </div>
    )
  }

  export default SprintGameStart