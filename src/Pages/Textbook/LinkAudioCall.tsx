import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SprintIcon } from './../../assets/svg/audiocall-game_icon.svg';
import './link-game.css';

function LinkAudioCall() {
  const navigate = useNavigate();
  return (
    <div className="link-game__card" onClick={() => navigate('/audioGame')}>
      <span className="link-game__icon">
        <SprintIcon />
      </span>
      <span className="link-game__description">
        <h4 className="link-game__description_title">Аудиовызов</h4>
        <p>угадай правильный перевод слова на слух</p>
      </span>
    </div>
  );
}

export default LinkAudioCall;
