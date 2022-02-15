import React, { useState } from 'react';
import { BASE_URL } from '../../constants';
import { ReactComponent as Bookmark } from './../../assets/svg/bookmark.svg';
import { ReactComponent as BookmarkDelete } from './../../assets/svg/bookmark-delete.svg';
import './textbook.css';
import './words.css';
import './word-card.css';
import api from '../../API';

function WordCard(props: WordCardProps) {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  const currentWord = props.words.find((item) => item.id === props.currentWord) || props.words[0];
  const level = currentWord.group;
  const textMeaning = { __html: currentWord.textMeaning };
  const textExample = { __html: currentWord.textExample };
  const imgUrl = `${BASE_URL}/${currentWord.image}`;
  const { word, wordTranslate, transcription, textExampleTranslate, textMeaningTranslate } = currentWord;
  const audio = new Audio();

  const difficult = props.userWords[0].paginatedResults.find((item) => item._id === currentWord.id);
  const isDifficult = difficult?.userWord?.difficulty === 'hard' ? true : false;

  const learned = props.userWords[0].paginatedResults.find((item) => item._id === currentWord.id);
  const isLearned = learned?.userWord?.optional?.isLearned;

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
    return { userId: userId, token: token, requestBody: requestBody };
  };

  const changeDifficulty = async (id: string, value: string) => {
    const { userId, token, requestBody } = requestData(id);
    const response = await api.updateWord(userId, id, token, { difficulty: value });
    if (response?.isSuccess === false) {
      requestBody.difficulty = value;
      await api.createWord(userId, id, token, requestBody);
    }
    props.updateUserWords();
  };

  const changeLearned = async (id: string, value: boolean) => {
    const { userId, token, requestBody } = requestData(id);
    const response = await api.updateWord(userId, id, token, { optional: { isLearned: value } });
    if (response?.isSuccess === false) {
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
          <span className={`card__bookmark level${level}` + (isDifficult ? ' checked' : '')}>
            {isAuthorized && !isDifficult && (
              <Bookmark
                onClick={() => {
                  changeDifficulty(currentWord.id, 'hard');
                  changeLearned(currentWord.id, false);
                }}
              />
            )}
            {isAuthorized && isDifficult && <BookmarkDelete onClick={() => changeDifficulty(currentWord.id, 'easy')} />}
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
        {isAuthorized && !isLearned && (
          <button
            type="button"
            className={`learned-btn level${level}`}
            onClick={() => {
              changeLearned(currentWord.id, true);
              changeDifficulty(currentWord.id, 'easy');
            }}
          >
            пометить как выученное
          </button>
        )}
        {isAuthorized && isLearned && (
          <button
            type="button"
            className={`learned-btn level${level}`}
            onClick={() => changeLearned(currentWord.id, false)}
          >
            удалить из выученных
          </button>
        )}
      </div>
    </>
  );
}

export default WordCard;
