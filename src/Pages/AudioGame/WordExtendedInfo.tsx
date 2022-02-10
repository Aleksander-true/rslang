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

  render() {
    return (
      <div className="word-info">
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
              <td>{this.props.gameState.collection[this.props.gameState.currentRound].textMeaning}</td>
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
              <td>{this.props.gameState.collection[this.props.gameState.currentRound].textExample}</td>
              <td>{this.props.gameState.collection[this.props.gameState.currentRound].textExampleTranslate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WordExtendedInfo;
