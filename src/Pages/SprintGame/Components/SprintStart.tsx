import React, { useEffect } from "react";
import { useState } from "react";
import { randomAnswer } from "../util";
import { WordFromCollection } from "../WordsAPI";
import ResultsPage from "./Results";
import SprintQuestions from "./SprintQuestions";

type SprintGameStartPropsTypes = {
  currentWords: WordFromCollection[];
};

const SprintGameStart: React.FC<SprintGameStartPropsTypes> = ({
  currentWords,
}) => {
  const [answers, setAnswers] = useState([""]);
  const [isDone, setIsDone] = useState(false);
  const [correctWords, setCorrectWords] = useState<WordFromCollection[]>([]);
  const [wrongWords, setWrongWords] = useState<WordFromCollection[]>([]);
  const [score, setScore] = useState(0);

  const onResetToInitialValues = () => {
    setIsDone(false);
    setCorrectWords([]);
    setWrongWords([]);
    setScore(0);
    formAnswers(currentWords);
  };

  const wordNum = correctWords.length + wrongWords.length;

  const formAnswers = async (currentWords: WordFromCollection[]) => {
    const myWords = await randomAnswer(currentWords);
    setAnswers(myWords || [""]);
  };

  useEffect(() => {
    if (currentWords) {
      formAnswers(currentWords);
    }
  }, []);

  return (
    <div className="sprint__question-page">
      {isDone || wordNum === currentWords.length ? (
        <>
          {" "}
          <ResultsPage
            correctWords={correctWords}
            wrongWords={wrongWords}
            score={score}
            onResetToInitialValues={onResetToInitialValues}
          />
        </>
      ) : null}
      {!isDone && wordNum < currentWords.length ? (
        <>
          <SprintQuestions
            setCorrectWords={setCorrectWords}
            setWrongWords={setWrongWords}
            answers={answers}
            currentWords={currentWords}
            setIsDone={setIsDone}
            score={score}
            setScore={setScore}
          />
        </>
      ) : null}
    </div>
  );
};

export default SprintGameStart;
