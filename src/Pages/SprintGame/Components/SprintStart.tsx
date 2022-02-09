import React from "react";
import { useState } from "react";
import { TIMER_TIME, WORDS_MAX } from "../const";
import { randomAnswer } from "../util";
import { WordFromCollection } from "../WordsAPI";
import ResultsPage from "./Results";
import SprintQuestions from "./SprintQuestions";

import CountDownTimer from "./CountDownTimer";

type SprintGameStartPropsTypes = {
  currentWords: WordFromCollection[]
}

const SprintGameStart: React.FC<SprintGameStartPropsTypes> = ({ currentWords }) => {
  const answers: string[] = randomAnswer(currentWords) as string[];
  const [isDone, setIsDone] = useState(false);
  const [correctWords, setCorrectWords] = useState<WordFromCollection[]>([]);
  const [wrongWords, setWrongWords] = useState<WordFromCollection[]>([]);
  const wordNum = correctWords.length + wrongWords.length;

  return (
    <div className='sprint__question-page'>
      {(isDone || wordNum === WORDS_MAX) ? <ResultsPage correctWords={correctWords} wrongWords={wrongWords} /> : null}
      {(!isDone && wordNum < WORDS_MAX) ? <> <CountDownTimer initialValue={TIMER_TIME} setIsDone={setIsDone} />
        <SprintQuestions setCorrectWords={setCorrectWords} setWrongWords={setWrongWords} answers={answers} currentWords={currentWords} />
      </> : null}
    </div>
  )
}

export default SprintGameStart