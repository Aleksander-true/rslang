import React from 'react';
import { Link } from 'react-router-dom';

function Levels(props) {
  return (
    <div className="level-wrapper">
      <Level levelName={'Beginner'} levelLetter={'A1'} level={'0'} />
      <Level levelName={'Elementary'} levelLetter={'A1+'} level={'1'} />
      <Level levelName={'Pre-Intermediate'} levelLetter={'A2'} level={'2'} />
      <Level levelName={'Intermediate'} levelLetter={'B1'} level={'3'} />
      <Level levelName={'Upper-Intermediate'} levelLetter={'B2'} level={'4'} />
      <Level levelName={'Advanced'} levelLetter={'C1'} level={'5'} />
    </div>
  );
}

function Level(props) {
  return (
    <Link to={`../textbook/level${props.level}&page0`}>
      <div className="level__card">
        <div>
          <p className="fs-4 m-0">{props.levelName}</p>
        </div>
        <div className="card__level-letter">
          <h2>{props.levelLetter}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Levels;
