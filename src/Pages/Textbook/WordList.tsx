import React, { useState } from 'react';
import './textbook.css';
import './words.css';

function WordList(props: WordListProps) {
  const difficultIds = props.difficultWords[0].paginatedResults.map((item) => item._id);

  const words = props.words.map((item) => (
    <button
      className={'list__button level' + item.group + (props.currentWord.id === item.id ? ' active' : '')}
      key={item.id}
      onClick={() => {
        props.clickWord(item.id);
      }}
    >
      <h3 className="list__word">{item.word}</h3>
      <h4>
        <i>{item.wordTranslate}</i>
      </h4>
      {difficultIds.includes(item.id) && <i className="bi bi-exclamation-circle exclamation_bottom-right"></i>}
    </button>
  ));
  return <>{words}</>;
}

export default WordList;
