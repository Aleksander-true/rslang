import React from 'react';
import dictionary from './../../assets/svg/dictionary_icon.svg'
import games from './../../assets/svg/games_icon.svg'
import statistics from './../../assets/svg/statistics_icon.svg'
import textbook from './../../assets/svg/textbook_icon.svg'
import { Link } from 'react-router-dom';

import './advantages.css';
import './home.css';

function Home() {
  return (
    <div className='home'>
<div className='advantages'>
        <h1 className='advantages__title'>Учите английский с <span className="marked">RSLang</span></h1>
        <h4 className='advantages__subtitle'>Используй быстрый и эффективный способ изучения языка.</h4>
        <ul className='advantages__list'>
          <li className='advantages__item'>3600 самых часто используемых английских слов, покрывающих 90% обычного разговора.</li>
          <li className='advantages__item'>Отмечайте слова для активного изучения, аудио примеры и картинки помогут запомнить лучше.</li>
          <li className='advantages__item'>Сделайте изучение слов более увлекательным с помощью мини-игр.</li>
          <li className='advantages__item'>Статистика - Следите за своим прогрессом каждый день.</li>
        </ul>
        <div className='advantages__icons-wrapper'>
            <figure className='advantages__icon'> 
              <Link to="/textbook">
                <img className='icon_img' src={dictionary} alt='Словарь'></img>
                <figcaption className='icon_desc'>Словарь</figcaption>
              </Link>
            </figure>
            <figure className='advantages__icon'> 
              <Link to="/textbook">
                <img className='icon_img' src={textbook} alt='Учебник'></img>
                <figcaption className='icon_desc'>Учебник</figcaption>
              </Link>
            </figure>
            <figure className='advantages__icon'> 
              <Link to="/sprintGame">
                <img className='icon_img' src={games} alt='Игры'></img>
                <figcaption className='icon_desc'>Игры</figcaption>
              </Link>
            </figure>
          <figure className='advantages__icon'> 
            <Link to="/statistics">
              <img className='icon_img' src={statistics} alt='Статистика'></img>
              <figcaption className='icon_desc'>Статистика</figcaption>
            </Link>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Home;