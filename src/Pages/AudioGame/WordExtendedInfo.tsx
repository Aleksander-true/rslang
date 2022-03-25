import React from 'react';
import { BASE_URL } from '../../constants';
import { PropsWordExtendedInfo } from './audiocall-types';
import { WordExtendedInfoState } from './audiocall-types';

class WordExtendedInfo extends React.Component<PropsWordExtendedInfo> {
  state: WordExtendedInfoState;

  constructor(props: PropsWordExtendedInfo) {
    super(props);
    this.state = {
      className: 'WordExtendedInfo',
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  play(src: string) {
    const audio = new Audio();
    audio.src = `${BASE_URL}/${src}`;
    audio.play();
  }

  createTextMeaning() {
    const string = this.props.gameState.collection[this.props.gameState.currentRound].textMeaning;
    return { __html: string };
  }

  createTextExample() {
    const string = this.props.gameState.collection[this.props.gameState.currentRound].textExample;
    return { __html: string };
  }

  render() {
    return (
      <div className="word-info">
        <div className="word-info-score">+ {this.props.gameScore.roundScore}</div>
        <div className="word-info-multiplier">{this.props.gameScore.multiplier}</div>
        <div className="word-info-total-score">
          Итого: <span className="word-info-total-number">{this.props.gameScore.gameScore}</span>
        </div>
        <table className="word-table">
          <tbody>
            <tr className="word-table-head">
              <th className="column-image">
                <img
                  className="word-table-image"
                  src={BASE_URL + '/' + this.props.gameState.collection[this.props.gameState.currentRound].image}
                  alt=""
                ></img>
              </th>
              <th className="column-play">Play</th>
              <th className="column-en">English</th>
              <th className="column-ru">Russian</th>
            </tr>
            <tr>
              <td className="column-name">WORD</td>
              <td className="column-play">
                <button
                  type="button"
                  className="btn btn-primary play-word play-table"
                  onClick={() => this.play(this.props.gameState.collection[this.props.gameState.currentRound].audio)}
                ></button>
              </td>
              <td>
                {this.props.gameState.collection[this.props.gameState.currentRound].word}
                <div>{this.props.gameState.collection[this.props.gameState.currentRound].transcription}</div>
              </td>
              <td>{this.props.gameState.correctAnswer}</td>
            </tr>
            <tr>
              <td className="column-name">DEFINITION</td>
              <td className="column-play">
                <button
                  type="button"
                  className="btn btn-primary play-word play-table"
                  onClick={() =>
                    this.play(this.props.gameState.collection[this.props.gameState.currentRound].audioMeaning)
                  }
                ></button>
              </td>
              <td dangerouslySetInnerHTML={this.createTextMeaning()} />
              <td>{this.props.gameState.collection[this.props.gameState.currentRound].textMeaningTranslate}</td>
            </tr>
            <tr>
              <td className="column-name">EXAMPLE</td>
              <td className="column-play">
                <button
                  type="button"
                  className="btn btn-primary play-word play-table"
                  onClick={() =>
                    this.play(this.props.gameState.collection[this.props.gameState.currentRound].audioExample)
                  }
                ></button>
              </td>
              <td dangerouslySetInnerHTML={this.createTextExample()} />
              <td>{this.props.gameState.collection[this.props.gameState.currentRound].textExampleTranslate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WordExtendedInfo;
