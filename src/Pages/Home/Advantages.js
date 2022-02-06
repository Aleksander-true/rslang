import React from 'react';
import sprint from './../../assets/svg/sprint_icon.svg'
import audioCall from './../../assets/svg/audio-call_icon.svg'
import statistics from './../../assets/svg/statistics_icon.svg'
import textbook from './../../assets/svg/textbook_icon.svg'
import { Link } from 'react-router-dom';
import './advantages.css';

function Advantages() {
  return (
      <div className='advantages'>
        <h1 className='advantages__title'>Учите английский с <span className="marked">RSLang</span></h1>
        <h4 className='advantages__subtitle'>Используй быстрый и эффективный способ изучения языка.</h4>
        <ul className='advantages__list'>
          <li className='advantages__item'>3600 самых используемых английских слов, покрывающих 90% потребностей разговора.</li>
          <li className='advantages__item'>Отмечай слова для активного изучения, аудио примеры и картинки помогут запомнить лучше.</li>
          <li className='advantages__item'>Сделай изучение слов более увлекательным с помощью мини-игр.</li>
          <li className='advantages__item'>Следи за своим прогрессом каждый день.</li>
        </ul>
        <div className='advantages__icons-wrapper'>
            <figure className='advantages__icon'> 
              <Link to="/textbook">
                <img className='icon_img' src={textbook} alt='Учебник'></img>
                <figcaption className='icon_desc'>Учебник</figcaption>
              </Link>
            </figure>
            <figure className='advantages__icon'> 
              <Link to="/sprintGame">
                <img className='icon_img' src={sprint} alt='Спринт'></img>
                <figcaption className='icon_desc'>Спринт</figcaption>
              </Link>
            </figure>
            <figure className='advantages__icon'> 
              <Link to="/audioGame">
                <img className='icon_img' src={audioCall} alt='Аудиовызов'></img>
                <figcaption className='icon_desc'>Аудиовызов</figcaption>
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
  );
}

export default Advantages;