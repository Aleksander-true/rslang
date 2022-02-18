import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Levels from './Levels';
import Footer from './../../Components/Footer';
import api from '../../API';
import Pagination from './Pagination';
import WordCard from './WordCard';
import WordList from './WordList';
import DifficultWordList from './DifficultWordList';
import DifficultWordCard from './DifficultWordCard';
import LinkSprint from './LinkSprint';
import LinkAudioCall from './LinkAudioCall';

import './textbook.css';
import './link-game.css';

const PAGES_QUANTITY = 30;
const WORDS_ON_PAGE = 20;

function Textbook() {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  const [search] = useSearchParams();
  const level = search.get('level') || '0';
  const page = search.get('page') || '0';
  const [words, setWords] = useState([] as GetWordsData);
  const [currentWordID, setCurrWord] = useState('');
  const [userWords, setUserWords] = useState([
    {
      paginatedResults: [],
      totalCount: { count: 0 },
    },
  ] as GetUserWordsData);

  const getWords = async (level: string, page: string) => {
    if (+level >= 6) return;
    const response = await api.getChunkOfWords(level, page);
    if (response?.isSuccess) {
      const data = response?.data as Word[];
      setWords(data);
      setCurrWord(data[0].id);
    }
  };

  const updateUserWords = async (fromGroup: string = level, fromPage: string = page) => {
    if (!isAuthorized) return;
    const response = await api.getAllUserAggregatedWords(
      localStorage.getItem('userId') || '',
      localStorage.getItem('token') || '',
      +fromGroup > 5 ? undefined : fromGroup,
      undefined,
      String(WORDS_ON_PAGE),
      '{"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.isLearned":true}]}',
    );
    if (response?.isSuccess) {
      setUserWords(response.data as GetUserWordsData);
    }
  };

  const changeWord = (id: string) => {
    setCurrWord(id);
  };

  useEffect(() => {
    getWords(level, page);
    updateUserWords(level, page);
  }, [level, page]);

  let wordCard, wordList, pagination;
  if (words.length !== 0 && +level <= 5) {
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
    pagination = <Pagination page={+page} lastPage={PAGES_QUANTITY} level={level} />;
  } else if (+level > 5) {
    wordList = (
      <DifficultWordList
        userWords={userWords}
        currentWord={currentWordID}
        clickWord={(id: string) => {
          changeWord(id);
        }}
      />
    );
    wordCard = (
      <DifficultWordCard currentWord={currentWordID} updateUserWords={updateUserWords} userWords={userWords} />
    );
  } else {
    wordCard = 'Loading...';
    wordList = 'Loading...';
  }

  return (
    <>
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels level={level} />
        <h2 className="textbook__title">Список слов</h2>
        <div className="words-wrapper">
          <div className="word__card">{wordCard}</div>
          <div className="word__list">{wordList}</div>
        </div>
        {pagination}
        <div className="link-game__wrapper">
          <h2 className="link-game__title textbook__title">Играть с этими словами</h2>
          <LinkSprint />
          <LinkAudioCall />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Textbook;
