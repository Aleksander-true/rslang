import { Routes, Route } from 'react-router-dom';

import Textbook from './../Pages/Textbook/Textbook'
import Statistics from './../Pages/Statistics/Statistics';
import About from './../Pages/About/About';
import SprintGame from './../Pages/SprintGame/SprintGame';
import AudioGame from './../Pages/AudioGame/AudioGame';
import Home from './../Pages/Home/Home';

function Main() {
  return (
      <main className='container main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/textbook" element={<Textbook />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/sprintGame" element={<SprintGame />} />
          <Route path="/audioGame" element={<AudioGame />} />
        </Routes>
      </main>
  );
}

export default Main;