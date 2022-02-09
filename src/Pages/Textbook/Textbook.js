import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Levels from './Levels';
import Words from './Words';
import api from './../../API';
import './textbook.css';

function Textbook() {
  const { newLevel = '0' } = useParams();
  const { newPage = '0' } = useParams();
  const [words, setWords] = useState([]);
  const [level, setLevel] = useState('');
  const [page, setPage] = useState('');

  if (newLevel !== level || newPage !== page) {
    setLevel(newLevel || '0');
    setPage(newPage || '0');
    getWords(newLevel, newPage, setWords);
  }

  async function getWords(level = '1', page = '1', setWords) {
    const response = await api.getChunkOfWords(level, page);
    setWords(response?.data);
    console.log('response?.data', response?.data);
  }

  return (
    <div className="textbook">
      <h2 className="textbook__title">Электронный учебник</h2>
      <Levels />
      <Words words={words} />
    </div>
  );
}

export default Textbook;
