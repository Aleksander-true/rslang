import React, { useState } from 'react';
import { BASE_URL } from '../../constants';
import { ReactComponent as BookmarkDelete } from './../../assets/svg/bookmark-delete.svg';
import api from '../../API';

function DifficultWordCard(props: DifficultWordCardProps) {
  const words = props.userWords[0].paginatedResults;
  if (words.length === 0) return <>Loading ...</>;
  const currentWord = words.find((item) => item._id === props.currentWord) || words[0];
  const level = currentWord?.group || '0';
  const textMeaning = { __html: currentWord.textMeaning };
  const textExample = { __html: currentWord.textExample };
  const imgUrl = `${BASE_URL}/${currentWord.image}`;
  const { word, wordTranslate, transcription, textExampleTranslate, textMeaningTranslate } = currentWord;
  const audio = new Audio();

  const playAudio = (str: string) => {
    let url = '';
    switch (str) {
      case 'translate':
        url = `${BASE_URL}/${currentWord.audio}`;
        break;
      case 'meaning':
        url = `${BASE_URL}/${currentWord.audioMeaning}`;
        break;
      case 'example':
        url = `${BASE_URL}/${currentWord.audioExample}`;
        break;
    }
    audio.src = url;
    audio.play();
  };

  const requestData = (id: string) => {
    const userId = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('token') || '';
    const requestBody = {
      difficulty: 'easy',
      optional: {
        isLearned: false,
        correctAnswers: 0,
        wrongAnswers: 0,
      },
    };
    const responsePromise = api.getWord(userId, id, token);
    return { userId, token, requestBody, responsePromise };
  };

  const changeDifficulty = async (id: string, value: string) => {
    const { userId, token, requestBody, responsePromise } = requestData(id);
    const response = (await responsePromise) as GetUserWordResponse;
    if (response?.isSuccess) {
      const optional = response?.data.optional;
      await api.updateWord(userId, id, token, {
        difficulty: value,
        optional: {
          isLearned: value === 'hard' ? false : optional?.isLearned,
          correctAnswers: optional?.correctAnswers,
          wrongAnswers: optional?.wrongAnswers,
        },
      });
    } else {
      requestBody.difficulty = value;
      await api.createWord(userId, id, token, requestBody);
    }
    props.updateUserWords();
  };

  const changeLearned = async (id: string, value: boolean) => {
    const { userId, token, requestBody, responsePromise } = requestData(id);
    const response = (await responsePromise) as GetUserWordResponse;
    if (response?.isSuccess) {
      const optional = response?.data.optional;
      await api.updateWord(userId, id, token, {
        difficulty: value ? 'easy' : response?.data.difficulty,
        optional: {
          isLearned: value,
          correctAnswers: optional?.correctAnswers,
          wrongAnswers: optional?.wrongAnswers,
        },
      });
    } else {
      requestBody.optional.isLearned = value;
      await api.createWord(userId, id, token, requestBody);
    }
    props.updateUserWords();
  };

  return (
    <>
      <img className="card__img" src={imgUrl} alt=""></img>
      <div className="card__description-wrapper">
        <h3 className="card__word">
          {word}
          <span className={`card__bookmark checked`}>
            <BookmarkDelete onClick={() => changeDifficulty(currentWord._id, 'easy')} />
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

        <button
          type="button"
          className={`learned-btn level${level}`}
          onClick={() => {
            changeLearned(currentWord._id, true);
          }}
        >
          пометить как выученное
        </button>
      </div>
    </>
  );
}

export default DifficultWordCard;
