import React, { useState } from 'react';
import './textbook.css';
import './words.css';

function WordList(props: WordListProps) {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  let difficultIds = [''];
  let learnedIds = [''];
  if (isAuthorized) {
    difficultIds = props.userWords[0].paginatedResults
      .filter((item) => item.userWord?.difficulty === 'hard')
      .map((item) => item._id);
    learnedIds = props.userWords[0].paginatedResults
      .filter((item) => item.userWord?.optional?.isLearned)
      .map((item) => item._id);
  }

  const words = props.words.map((item) => (
    <button
      className={'list__button level' + item.group + (props.currentWord === item.id ? ' active' : '')}
      key={item.id}
      onClick={() => {
        props.clickWord(item.id);
      }}
    >
      <h3 className="list__word">{item.word}</h3>
      <h4>
        <i>{item.wordTranslate}</i>
      </h4>
      {isAuthorized && difficultIds.includes(item.id) && (
        <i className="bi bi-exclamation-circle exclamation_bottom-right"></i>
      )}
      {isAuthorized && learnedIds.includes(item.id) && (
        <i className="bi bi-check-circle-fill check-square_top-right icon_green"></i>
      )}
    </button>
  ));
  return <>{words}</>;
}

export default WordList;
