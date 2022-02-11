import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Levels from './Levels';
import Words from './Words';
import Footer from './../../Components/Footer';

import api from '../../API';
import './textbook.css';
import Pagination from './Pagination';

const PAGES_QUANTITY = 30;

function Textbook() {
  const [search] = useSearchParams();

  const newLevel = search.get('level') || '0';
  const newPage = search.get('page') || '0';
  const [words, setWords] = useState([] as GetWordsData);
  const [previous, setPrevious] = useState('');

  const getWords = async (level = '1', page = '1', setWords: SetWords) => {
    const response = await api.getChunkOfWords(level, page);
    if (response?.isSuccess) {
      const data = response?.data as Word[];
      setWords(data);
    }
  };

  if (`${newLevel}-${newPage}` !== previous) {
    setPrevious(`${newLevel}-${newPage}` || '0-0');
    getWords(newLevel, newPage, setWords);
  }

  return (
    <>
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels />
        <Words words={words} />
        <Pagination page={+newPage} lastPage={PAGES_QUANTITY - 1} level={newLevel} />
      </div>
      <Footer />
    </>
  );
}

export default Textbook;
