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
  const [level, setLevel] = useState('');
  const [page, setPage] = useState('');
  const [words, setWords] = useState([] as GetWordsData);

  const getWords = async (level: string, page: string) => {
    const response = await api.getChunkOfWords(level, page);
    if (response?.isSuccess) {
      const data = response?.data as Word[];
      setWords(data);
    }
  };

  if (newLevel !== level || newPage !== page) {
    setLevel(newLevel);
    setPage(newPage);
    getWords(newLevel, newPage);
  }

  return (
    <>
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels />
        <Words words={words} />
        <Pagination page={+page} lastPage={PAGES_QUANTITY - 1} level={level} />
      </div>
      <Footer />
    </>
  );
}

export default Textbook;
