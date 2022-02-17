import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Levels() {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  return (
    <div className="level-wrapper">
      <Level levelName={'Beginner'} levelLetter={'A0'} levelNumber={'0'} />
      <Level levelName={'Elementary'} levelLetter={'A1'} levelNumber={'1'} />
      <Level levelName={'Pre-Intermediate'} levelLetter={'A2'} levelNumber={'2'} />
      <Level levelName={'Intermediate'} levelLetter={'B1'} levelNumber={'3'} />
      <Level levelName={'Upper-Intermediate'} levelLetter={'B2'} levelNumber={'4'} />
      <Level levelName={'Advanced'} levelLetter={'C1'} levelNumber={'5'} />
      {isAuthorized && <Level levelName={'Difficult'} levelLetter={'D'} levelNumber={'6'} />}
    </div>
  );
}

function Level(props: LevelProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="level__card" onClick={() => setSearchParams({ level: props.levelNumber, page: '0' })}>
      <div>
        <p className="fs-4 m-0">{props.levelName}</p>
      </div>
      <div className="card__level-letter">
        <h2>{props.levelLetter}</h2>
      </div>
    </div>
  );
}

export default Levels;
