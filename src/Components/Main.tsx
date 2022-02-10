import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Textbook from '../Pages/Textbook/Textbook';
import Statistics from '../Pages/Statistics/Statistics';
import SprintGame from '../Pages/SprintGame/SprintGame';
import AudioGame from '../Pages/AudioGame/AudioGame';
import Home from '../Pages/Home/Home';
import whatWords from './whatWords';

function Main() {
  whatWords.fromURL(useLocation().search);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="textbook/level=:newLevel&page:newPage" element={<Textbook />}></Route>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/sprintGame" element={<SprintGame />} />
        <Route path="/audioGame" element={<AudioGame />} />
      </Routes>
    </main>
  );
}

export default Main;
