import React from 'react';
import { PropsResultsAudiocall } from './audiocall-types';
import { RoundResult } from './audiocall-types';
import { BASE_URL } from '../../constants.js';

class ResultsAudiocall extends React.Component<PropsResultsAudiocall> {
  componentDidMount() {}

  componentWillUnmount() {}

  play(src: string) {
    const audio = new Audio();
    audio.src = `${BASE_URL}/${src}`;
    audio.play();
  }

  makeRow(res: RoundResult) {
    return (
      <tr>
        <td>
          <button
            type="button"
            className="btn btn-primary play-word play-table"
            onClick={() => this.play(res.audioSrc)}
          ></button>
        </td>
        {res.isGuessed ? (
          <td className="guessed-word">{res.word}</td>
        ) : (
          <td className="not-guessed-word">{res.word}</td>
        )}
        {res.isGuessed ? <td>{res.translate}</td> : <td className="not-guessed-word-translate">{res.translate}</td>}
      </tr>
    );
  }

  makePercents() {
    return Math.trunc((this.props.finalResult.gameScore * 100) / 1100);
  }

  render() {
    const tableTemplate = this.props.results.map((res: RoundResult) => {
      return this.makeRow(res);
    });

    return (
      <div className="audiocall-results-page">
        <div className="word-info-total-score">
          Ваш результат: <span className="word-info-total-number">{this.props.finalResult.gameScore}</span> очков
        </div>
        <div className="audiocall-results-list">
          <table className="result-table">
            <tbody>{tableTemplate}</tbody>
          </table>
        </div>
        <button type="button" className="btn btn-warning" onClick={() => this.props.resetGame()}>
          Меню
        </button>
      </div>
    );
  }
}

export default ResultsAudiocall;
