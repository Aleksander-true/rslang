import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Levels(props: { level: string }) {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  return (
    <div className={`level-wrapper level${props.level}`}>
      <Level levelName={'Beginner'} levelLetter={'A1'} levelNumber={'0'} level={props.level} />
      <Level levelName={'Elementary'} levelLetter={'A1+'} levelNumber={'1'} level={props.level} />
      <Level levelName={'Pre-Intermediate'} levelLetter={'A2'} levelNumber={'2'} level={props.level} />
      <Level levelName={'Intermediate'} levelLetter={'B1'} levelNumber={'3'} level={props.level} />
      <Level levelName={'Upper-Intermediate'} levelLetter={'B2'} levelNumber={'4'} level={props.level} />
      <Level levelName={'Advanced'} levelLetter={'C1'} levelNumber={'5'} level={props.level} />
      {isAuthorized && <Level levelName={'Difficult'} levelLetter={'D'} levelNumber={'6'} level={props.level} />}
    </div>
  );
}

function Level(props: LevelProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={'level__card' + (props.level === props.levelNumber ? ' active' : '')}
      onClick={() => setSearchParams({ level: props.levelNumber, page: '0' })}
    >
      <div>
        <p className="fs-4 m-0">{props.levelName}</p>
      </div>
      <div className="card__level-circle">
        <h2 className="card__level-letter">{props.levelLetter}</h2>
      </div>
    </div>
  );
}

export default Levels;
