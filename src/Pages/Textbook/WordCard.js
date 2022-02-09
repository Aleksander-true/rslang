import React from 'react';
import { BASE_URL } from '../../constants';
import './textbook.css';
import './words.css';

function WordCard(props) {
  const currentWord = props.words.find((item) => item.id === props.currentWordId) || props.words[0];

  const textMeaning = { __html: currentWord.textMeaning };
  const textExample = { __html: currentWord.textExample };
  const imgUrl = `${BASE_URL}/${currentWord.image}`;
  const { word, wordTranslate, transcription, textExampleTranslate, textMeaningTranslate } = currentWord;
  return (
    <>
      <img className="card__img" src={imgUrl} alt=""></img>
      <div className="card__description-wrapper">
        <h3>
          {word} - {transcription}
        </h3>
        <h4>
          <i>{wordTranslate}</i>
        </h4>
        <hr></hr>
        <h4>Значение</h4>
        <p dangerouslySetInnerHTML={textMeaning}></p>
        <p>{textMeaningTranslate}</p>
        <h4>Пример</h4>
        <p dangerouslySetInnerHTML={textExample}></p>
        <p>{textExampleTranslate}</p>
      </div>
    </>
  );
}

export default WordCard;
