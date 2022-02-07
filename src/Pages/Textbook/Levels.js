import React from 'react';
import './textbook.css';

class Levels extends React.Component {
  render() {
    return (
      <div className="level-wrapper">
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Beginner</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>A1</h2>
          </div>
        </div>
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Elementary</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>A1+</h2>
          </div>
        </div>
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Pre-Intermediate</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>A2</h2>
          </div>
        </div>
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Intermediate</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>B1</h2>
          </div>
        </div>
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Upper-Intermediate</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>B2</h2>
          </div>
        </div>
        <div className="level__card">
          <div>
            <p className="fs-4 m-0">Advanced</p>
            <p className="m-0">words: 600</p>
          </div>
          <div className="card__level-letter">
            <h2>C1</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Levels;
