import React from "react";
import WordString from "./WordString";
import { WordFromCollection } from "../WordsAPI";
import endSound from "../../../assets/audio/end.mp3";
import Button from "../../../Components/Button";

type ResultsPagePropsType = {
  correctWords: WordFromCollection[];
  wrongWords: WordFromCollection[];
  score: number;
  onResetToInitialValues: () => void;
};

const ResultsPage: React.FC<ResultsPagePropsType> = ({
  correctWords,
  wrongWords,
  score,
  onResetToInitialValues,
}) => {
  const correctWordsElements = correctWords.map((word) => (
    <WordString
      englishWord={word.word}
      russianWord={word.wordTranslate}
      sound={word.audio}
      key={word.word}
      type={"v"}
    />
  ));

  const wrongWordsElements = wrongWords.map((word) => (
    <WordString
      englishWord={word.word}
      russianWord={word.wordTranslate}
      sound={word.audio}
      key={word.word}
      type={"x"}
    />
  ));

  const audio = new Audio();
  audio.src = endSound;
  audio.play();

  return (
    <div className="sprint__results">
      <div className="sprint__results__header">
        <h3 className="sprint__question-page__correct">
          Верно:
          <p>{correctWords.length}</p>
        </h3>
        <h3 className="sprint__question-page__count">{score}</h3>
        <h3 className="sprint__question-page__false">
          Ошибки:
          <p>{wrongWords.length}</p>
        </h3>
      </div>

      <ul className="sprint__results-list">{correctWordsElements}</ul>
      <hr />

      <ul className="sprint__results-list">{wrongWordsElements}</ul>

      <Button
        title="Играть с этими словами ещё"
        onClick={onResetToInitialValues}
        type="success"
        classType="sprint__btns"
      />
    </div>
  );
};

export default ResultsPage;
