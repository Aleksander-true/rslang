import React from "react";
import { useState } from "react";
import { SprintGameInsidePropsType } from "../../../Types/sprint";
import { TIMER_TIME, WORDS_MAX } from "../const";
import { WordFromCollection } from "../words";
import ResultsPage from "./Results";
import SprintQuestions from "./SprintQuestions";
import Timer from "./Timer";




const SprintGameInside:React.FC<SprintGameInsidePropsType> = ({answers, currentWords}) => {

    const [timeLeft, setTimeLeft] = useState(TIMER_TIME);
  
    const [correctWords, setCorrectWords] = useState<WordFromCollection[]>([]);
    const [wrongWords, setWrongWords] = useState<WordFromCollection[]>([]);
  
    const wordNum = correctWords.length + wrongWords.length;
  
    return (
      <div className='sprint__question-page'>
        {(timeLeft === 0 || wordNum === WORDS_MAX) ? <ResultsPage correctWords={correctWords} wrongWords={wrongWords} /> : null}
        {(timeLeft > 0 && wordNum < WORDS_MAX) ? <> <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} /><SprintQuestions setCorrectWords={setCorrectWords} setWrongWords={setWrongWords} answers={answers} currentWords={currentWords}/> </> : null}
      </div>
    )
  }

  export default SprintGameInside