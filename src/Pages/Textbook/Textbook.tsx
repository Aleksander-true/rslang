import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Levels from './Levels';
import Footer from './../../Components/Footer';
import api from '../../API';
import Pagination from './Pagination';
import WordCard from './WordCard';
import WordList from './WordList';

import './textbook.css';
import './words.css';

const PAGES_QUANTITY = 30;

function Textbook() {
  const [search] = useSearchParams();
  const newLevel = search.get('level') || '0';
  const newPage = search.get('page') || '0';
  const [level, setLevel] = useState('');
  const [page, setPage] = useState('');
  const [words, setWords] = useState([] as GetWordsData);
  const [currentWordID, setCurrWord] = useState('');
  const [userWords, setUserWords] = useState([
    {
      paginatedResults: [],
      totalCount: { count: 0 },
    },
  ] as GetUserWordsData);

  const getWords = async (level: string, page: string) => {
    const response = await api.getChunkOfWords(level, page);
    if (response?.isSuccess) {
      const data = response?.data as Word[];
      setWords(data);
      setCurrWord(data[0].id);
    }
  };

  const updateUserWords = async (fromGroup: string = level, fromPage: string = page) => {
    const response = await api.getAllUserAggregatedWords(
      localStorage.getItem('userId'),
      localStorage.getItem('token'),
      fromGroup,
      undefined,
      PAGES_QUANTITY,
      '{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.isLearned":true}]}',
    );
    if (response?.isSuccess) {
      setUserWords(response.data as GetUserWordsData);
    }
    console.log('difficultWords', response?.data);
  };

  const changeWord = (id: string) => {
    console.log('changeWord');
    setCurrWord(id);
  };

  useEffect(() => {
    if (newLevel !== level || newPage !== page) {
      setLevel(newLevel);
      setPage(newPage);
      getWords(newLevel, newPage);
      updateUserWords(newLevel, newPage);
    }
  });

  let wordCard, wordList;
  if (words.length !== 0) {
    wordCard = (
      <WordCard words={words} currentWord={currentWordID} updateUserWords={updateUserWords} userWords={userWords} />
    );
    wordList = (
      <WordList
        words={words}
        userWords={userWords}
        currentWord={currentWordID}
        clickWord={(id: string) => {
          changeWord(id);
        }}
      />
    );
  } else {
    wordCard = 'Loading...';
    wordList = 'Loading...';
  }

  return (
    <>
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels />
        <h2 className="textbook__title">Список слов</h2>
        <div className="words-wrapper">
          <div className="word__card">{wordCard}</div>
          <div className="word__list">{wordList}</div>
        </div>
        <Pagination page={+page} lastPage={PAGES_QUANTITY - 1} level={level} />
      </div>
      <Footer />
    </>
  );
}

export default Textbook;
