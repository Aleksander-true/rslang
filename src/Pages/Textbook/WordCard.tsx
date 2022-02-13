import React, { useState } from 'react';
import { BASE_URL } from '../../constants';
import { ReactComponent as Bookmark } from './../../assets/svg/bookmark.svg';
import './textbook.css';
import './words.css';
import './word-card.css';
import api from '../../API';

function WordCard(props: WordCardProps) {
  const currentWord = props.words.find((item) => item.id === props.currentWord.id) || props.words[0];
  const textMeaning = { __html: currentWord.textMeaning };
  const textExample = { __html: currentWord.textExample };
  const imgUrl = `${BASE_URL}/${currentWord.image}`;
  const { word, wordTranslate, transcription, textExampleTranslate, textMeaningTranslate } = currentWord;
  const audio = new Audio();

  const difficult = props.difficultWords[0].paginatedResults.find((item) => item._id === currentWord.id);
  const isDifficult = difficult?.userWord?.difficulty === 'hard' ? true : false;

  const playAudio = (str: string) => {
    let url = '';
    switch (str) {
      case 'translate':
        url = `${BASE_URL}/${currentWord.audio}`;
        break;
      case 'meainig':
        url = `${BASE_URL}/${currentWord.audioMeaning}`;
        break;
      case 'example':
        url = `${BASE_URL}/${currentWord.audioExample}`;
        break;
    }
    audio.src = url;
    audio.play();
  };

  const markAsDifficult = async (id: string) => {
    console.log('markAsDifficult');
    const response = await api.getWord(localStorage.getItem('userId'), id, localStorage.getItem('token'));
    const requestBody = {
      difficulty: 'hard',
      optional: {
        isLearned: false,
        correctAnswers: 0,
        wrongAnswers: 0,
      },
    };
    if (response?.isSuccess) {
      api.updateWord(localStorage.getItem('userId'), id, localStorage.getItem('token'), { difficulty: 'hard' });
      props.updateDifficultWords();
    } else {
      const create = await api.createWord(
        localStorage.getItem('userId'),
        id,
        localStorage.getItem('token'),
        requestBody,
      );
      if (create?.isSuccess) {
        props.updateDifficultWords();
      }
    }
  };

  return (
    <>
      <img className="card__img" src={imgUrl} alt=""></img>
      <div className="card__description-wrapper">
        <h3 className="card__word">
          {word}
          <span
            className={'card__bookmark' + (isDifficult ? ' checked' : '')}
            onClick={() => markAsDifficult(currentWord.id)}
          >
            <Bookmark />
          </span>
        </h3>
        <h4 className="card__translate">
          <i>
            {wordTranslate} - {transcription}
          </i>
          <i className="bi bi-volume-down-fill card__volume-icon" onClick={() => playAudio('translate')}></i>
        </h4>
        <hr></hr>
        <h4>
          Значение
          <i className="bi bi-volume-down-fill card__volume-icon" onClick={() => playAudio('meaning')}></i>
        </h4>
        <p dangerouslySetInnerHTML={textMeaning}></p>
        <p>{textMeaningTranslate}</p>
        <h4>
          Пример
          <i className="bi bi-volume-down-fill card__volume-icon" onClick={() => playAudio('example')}></i>
        </h4>
        <p dangerouslySetInnerHTML={textExample}></p>
        <p>{textExampleTranslate}</p>
      </div>
    </>
  );
}

export default WordCard;
