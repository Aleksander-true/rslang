import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SprintIcon } from './../../assets/svg/sprint-game_icon.svg';
import './link-game.css';

function LinkSprint(props: { isLearnedAllWords: boolean }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (!props.isLearnedAllWords) {
      navigate('/sprintGame');
    }
  };
  return (
    <div
      className={'link-game__card' + (props.isLearnedAllWords ? ' disable' : '')}
      onClick={() => {
        if (!props.isLearnedAllWords) navigate('/sprintGame');
      }}
    >
      <span className="link-game__icon">
        <SprintIcon />
      </span>
      <span className="link-game__description">
        <h4 className="link-game__description_title">Спринт</h4>
        <p>попробуй угадать как можно больше слов за 30 секунд</p>
      </span>
    </div>
  );
}

export default LinkSprint;
