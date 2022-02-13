import React from 'react';
import { BASE_URL } from '../../constants';
import WordInfo from './WordInfo';
import WordExtendedInfo from './WordExtendedInfo';
import AnswerButton from './AnswerButton';
import BlockedButton from './BlockedButton';
import { GameState } from './audiocall-types';
import { PropsPlayAudiocall } from './audiocall-types';

class PlayAudiocall extends React.Component<PropsPlayAudiocall> {
  state: GameState;

  constructor(props: PropsPlayAudiocall) {
    super(props);
    this.state = {
      isAnswer: false,
      gameResults: [],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  checkAnswer(status: boolean, value?: string) {
    this.setState({
      isAnswer: true,
    });
    const isGuessed = status;
    const word = this.props.getState().collection[this.props.getState().currentRound].word;
    const translate = this.props.getState().collection[this.props.getState().currentRound].wordTranslate;
    const audioSrc = this.props.getState().collection[this.props.getState().currentRound].audio;
    const roundResult = {
      word: word,
      translate: translate,
      audioSrc: audioSrc,
      isGuessed: isGuessed,
    };
    const prevState = this.props.getState();
    const prevResults = prevState.gameResults.slice();
    prevResults.push(roundResult);
    this.props.setResult(prevResults);
  }

  nextButton() {
    this.setState({
      isAnswer: false,
    });
    this.props.nextRound();
  }

  playWord() {
    const state = this.props.getState();
    const round = state.currentRound;
    const wordAudio = new Audio();
    wordAudio.src = `${BASE_URL}/${state.collection[round].audio}`;
    wordAudio.play();
  }

  checkCorrectProp(num: number): boolean {
    return this.props.getState().answers[num] === this.props.getState().correctAnswer;
  }

  possibleClasses() {
    return ['btn btn-danger', 'btn btn-secondary'];
  }

  returnBlockedButton(num: number) {
    return (
      <BlockedButton
        possibleClasses={this.possibleClasses()}
        isCorrect={this.checkCorrectProp(num)}
        value={this.props.getState().answers[num]}
      />
    );
  }

  returnAnswerButton(num: number) {
    return (
      <AnswerButton
        isCorrect={this.checkCorrectProp(num)}
        value={this.props.getState().answers[num]}
        onClick={(isCorrect, value) => this.checkAnswer(isCorrect, value)}
      />
    );
  }

  render() {
    return (
      <div className="audiocall-game-page">
        {this.state.isAnswer ? (
          <WordExtendedInfo gameState={this.props.getState()} playWord={() => this.playWord()} />
        ) : (
          <WordInfo playWord={() => this.playWord()} />
        )}
        <div className="answers-variants">
          {this.state.isAnswer ? this.returnBlockedButton(0) : this.returnAnswerButton(0)}
          {this.state.isAnswer ? this.returnBlockedButton(1) : this.returnAnswerButton(1)}
          {this.state.isAnswer ? this.returnBlockedButton(2) : this.returnAnswerButton(2)}
          {this.state.isAnswer ? this.returnBlockedButton(3) : this.returnAnswerButton(3)}
          {this.state.isAnswer ? this.returnBlockedButton(4) : this.returnAnswerButton(4)}
        </div>
        <div className="audiocall-controls">
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.resetGame()}>
            Reset game
          </button>
          <button
            disabled={!this.state.isAnswer}
            type="button"
            className={this.state.isAnswer ? 'btn btn-warning btn-lg' : 'btn btn-outline-warning btn-lg'}
            onClick={() => this.nextButton()}
          >
            Next word
          </button>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.finishGame()}>
            Finish game
          </button>
        </div>
      </div>
    );
  }
}

export default PlayAudiocall;
