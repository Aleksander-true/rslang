import React, { useState } from 'react';
import WordCard from './WordCard';
import WordList from './WordList';

import './textbook.css';
import './words.css';

function Words(props: { words: never[] | Word[] }) {
  const [currentWordId, setWords] = useState('');

  const clickWord = (id: string) => {
    setWords(id);
  };

  let wordCard, wordList;
  if (props.words.length !== 0) {
    wordCard = <WordCard words={props.words} currentWordId={currentWordId} />;
    wordList = (
      <WordList
        words={props.words}
        clickWord={(id: string) => {
          clickWord(id);
        }}
      />
    );
  } else {
    wordCard = 'Loading...';
    wordList = 'Loading...';
  }

  return (
    <>
      <h2 className="textbook__title">Список слов</h2>
      <div className="words-wrapper">
        <div className="word__card">{wordCard}</div>
        <div className="word__list">{wordList}</div>
      </div>
    </>
  );
}

export default Words;
