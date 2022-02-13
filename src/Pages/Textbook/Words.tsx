import React, { useEffect, useState } from 'react';
import WordCard from './WordCard';
import WordList from './WordList';
import api from '../../API';

import './textbook.css';
import './words.css';

function Words(props: WordsProps) {
  const [currentWord, setCurrWord] = useState({ id: '', level: NaN });
  const [difficultWords, setDifficultWords] = useState([
    {
      paginatedResults: [],
      totalCount: { count: 0 },
    },
  ] as GetDifficultWordsData);

  const getDifficultWords = async (fromGroup: number = currentWord.level) => {
    const response = await api.getAllUserAggregatedWords(
      localStorage.getItem('userId'),
      localStorage.getItem('token'),
      fromGroup,
      undefined,
      30,
      '{ "userWord.difficulty": "hard" }',
    );
    if (response?.isSuccess) {
      const newDifficultWords = response.data as GetDifficultWordsData;
      setDifficultWords(newDifficultWords);
    }
    console.log('difficultWords', response?.data);
  };

  const clickWord = (id: string = currentWord.id) => {
    setCurrWord({
      id: id,
      level: currentWord.level,
    });
  };

  useEffect(() => {
    if (props.words[0] && props.words[0].group !== currentWord.level) {
      const newLevel = props.words[0]?.group;
      console.log('newLevel', newLevel, 'currentWord.level', currentWord.level);
      setCurrWord({ id: props.words[0].id, level: newLevel });
      getDifficultWords(newLevel);
    }
  });

  let wordCard, wordList;
  if (props.words.length !== 0) {
    wordCard = (
      <WordCard
        words={props.words}
        currentWord={currentWord}
        updateDifficultWords={getDifficultWords}
        difficultWords={difficultWords}
      />
    );
    wordList = (
      <WordList
        words={props.words}
        difficultWords={difficultWords}
        currentWord={currentWord}
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
