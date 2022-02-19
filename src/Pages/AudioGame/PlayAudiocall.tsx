import React, { KeyboardEvent } from 'react';
import api from '../../API';
import WordInfo from './WordInfo';
import WordExtendedInfo from './WordExtendedInfo';
import AnswerButton from './AnswerButton';
import BlockedButton from './BlockedButton';
import { GameState } from './audiocall-types';
import { PropsPlayAudiocall } from './audiocall-types';
import { OptionalUserWord, UserWord } from '../../Types/api-tipes';

class PlayAudiocall extends React.Component<PropsPlayAudiocall> {
  state: GameState;

  constructor(props: PropsPlayAudiocall) {
    super(props);
    this.state = {
      roundScore: 0,
      gameScore: 0,
      correctSeries: 0,
      multiplier: '',
      isAnswer: false,
      isPreAnswer: false,
      gameResults: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyup);
  }

  handleKeyup = () => {
    if (!this.props.getState().isStarted || this.props.getState().isFinished || this.props.getState().isRequesting) {
      return;
    }
    const event = window.event as unknown as KeyboardEvent;
    event.preventDefault();
    let isCorrect: boolean;
    switch (event.code) {
      case 'Digit1':
      case 'Numpad1':
        if (this.state.isAnswer) break;
        isCorrect = this.checkCorrectProp(0);
        this.checkAnswer(isCorrect);
        break;
      case 'Digit2':
      case 'Numpad2':
        if (this.state.isAnswer) break;
        isCorrect = this.checkCorrectProp(1);
        this.checkAnswer(isCorrect);
        break;
      case 'Digit3':
      case 'Numpad3':
        if (this.state.isAnswer) break;
        isCorrect = this.checkCorrectProp(2);
        this.checkAnswer(isCorrect);
        break;
      case 'Digit4':
      case 'Numpad4':
        if (this.state.isAnswer) break;
        isCorrect = this.checkCorrectProp(3);
        this.checkAnswer(isCorrect);
        break;
      case 'Digit5':
      case 'Numpad5':
        if (this.state.isAnswer) break;
        isCorrect = this.checkCorrectProp(4);
        this.checkAnswer(isCorrect);
        break;
      case 'Space':
        this.playWord();
        break;
      case 'Enter':
        if (!this.state.isAnswer) {
          this.checkAnswer(false);
        } else {
          this.nextButton();
        }
        break;
      case 'Escape':
        this.props.resetGame();
        break;
      default:
        break;
    }
  };

  playCorrect() {
    const correct = new Audio(require('../../assets/audio/correct.mp3'));
    correct.play();
  }

  playWrong() {
    const wrong = new Audio(require('../../assets/audio/wrong.mp3'));
    wrong.play();
  }

  calculateScore(series: number) {
    let score = 0;
    let multiplier = '';
    switch (true) {
      case series < 4:
        score = 10;
        break;
      case series < 7:
        score = 20;
        multiplier = 'X2';
        break;
      case series < 10:
        score = 30;
        multiplier = 'X3';
        break;
      case series < 13:
        score = 40;
        multiplier = 'X4';
        break;
      case series < 16:
        score = 50;
        multiplier = 'X5';
        break;
      case series <= 19:
        score = 100;
        multiplier = 'X10';
        break;
      case series === 20:
        score = 150;
        multiplier = 'X15';
        break;
      case series > 20:
        score = 200;
        multiplier = 'X20';
        break;
    }
    return [String(score), multiplier];
  }

  async checkAnswer(status: boolean, value?: string) {
    if (this.state.isPreAnswer) return;
    await new Promise<void>((resolve) => {
      this.setState(
        {
          isPreAnswer: true,
        },
        () => resolve(),
      );
    });
    if (!this.props.getState().isWordStatistic) {
      return;
    }
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
    const userWordStatistic = this.props.getState().statisticWord;
    const gameStatistic = this.props.getState().statisticGame;
    if (isGuessed) {
      (userWordStatistic.optional as OptionalUserWord).correctAnswers =
        (userWordStatistic.optional?.correctAnswers as number) + 1;
      (userWordStatistic.optional as OptionalUserWord).progress = (userWordStatistic.optional?.progress as number) + 1;
      if (userWordStatistic.difficulty === 'easy' && userWordStatistic.optional?.progress === 3) {
        (userWordStatistic.optional as OptionalUserWord).isLearned = true;
        gameStatistic.learnedWords += 1;
        gameStatistic.optional.wordStatistics[this.props.getState().date].learnedWords += 1;
      } else if (userWordStatistic.difficulty === 'hard' && userWordStatistic.optional?.progress === 5) {
        userWordStatistic.difficulty = 'easy';
        (userWordStatistic.optional as OptionalUserWord).isLearned = true;
        gameStatistic.learnedWords += 1;
        gameStatistic.optional.wordStatistics[this.props.getState().date].learnedWords += 1;
      }
    } else {
      (userWordStatistic.optional as OptionalUserWord).wrongAnswers =
        (userWordStatistic.optional as OptionalUserWord).wrongAnswers + 1;
      (userWordStatistic.optional as OptionalUserWord).progress = 0;
      if (userWordStatistic.optional?.isLearned) {
        (userWordStatistic.optional as OptionalUserWord).isLearned = false;
        if (gameStatistic.learnedWords > 0) {
          gameStatistic.learnedWords -= 1;
        }
        if (gameStatistic.optional.wordStatistics[this.props.getState().date].learnedWords > 0) {
          gameStatistic.optional.wordStatistics[this.props.getState().date].learnedWords -= 1;
        }
      }
    }
    const isWordSended = await this.sendUserWord(userWordStatistic);
    if (!isWordSended) {
      return;
    } else {
      this.props.changeStatisticFlag();
    }
    let roundScore = 0;
    let gameScore = this.state.gameScore;
    let correctSeries = this.state.correctSeries;
    let multiplier = '';
    if (isGuessed) {
      correctSeries += 1;
      const calculatedResult = this.calculateScore(correctSeries);
      roundScore = Number(calculatedResult[0]);
      multiplier = calculatedResult[1];
      gameScore += roundScore;
      gameStatistic.optional.audio.correctAnswers += 1;
      gameStatistic.optional.wordStatistics[this.props.getState().date].correctAnswers += 1;
      if (gameStatistic.optional.audio.longestSeries < correctSeries) {
        gameStatistic.optional.audio.longestSeries = correctSeries;
      }
      gameStatistic.optional.audio.totalScore += roundScore;
      if (userWordStatistic.difficulty === 'easy' && userWordStatistic.optional?.correctAnswers === 3) {
        (userWordStatistic.optional as OptionalUserWord).isLearned = true;
      } else if (userWordStatistic.difficulty === 'hard' && userWordStatistic.optional?.correctAnswers === 5) {
        userWordStatistic.difficulty = 'easy';
        (userWordStatistic.optional as OptionalUserWord).isLearned = true;
      }
    } else {
      correctSeries = 0;
      multiplier = '';
      gameStatistic.optional.audio.wrongAnswers += 1;
      gameStatistic.optional.wordStatistics[this.props.getState().date].mistakes += 1;
    }
    this.props.updateStatistic(gameScore, gameStatistic);
    this.props.setResult(prevResults);
    if (isGuessed) {
      this.playCorrect();
    } else {
      this.playWrong();
    }
    this.setState(
      {
        roundScore: roundScore,
        gameScore: gameScore,
        correctSeries: correctSeries,
        multiplier: multiplier,
      },
      () => {
        this.setState({
          isAnswer: true,
        });
      },
    );
    this.setState({
      isPreAnswer: false,
    });
  }

  async sendUserWord(wordStatistic: UserWord) {
    if (!this.props.getState().isAuthorised) {
      return true;
    }
    let result;
    const ID = this.props.getState().userID;
    const wordID = this.props.getState().collection[this.props.getState().currentRound].id;
    const token = localStorage.getItem('token') as string;
    if (this.props.getState().isWordOnServer) {
      result = await api.updateWord(ID, wordID, token, wordStatistic);
    } else {
      result = await api.createWord(ID, wordID, token, wordStatistic);
    }
    return result?.isSuccess;
  }

  nextButton() {
    this.setState({
      isAnswer: false,
    });
    this.props.nextRound();
  }

  playWord() {
    const state = this.props.getState();
    const wordAudio = new Audio();
    wordAudio.src = `${state.audioSrc}`;
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
        id={num + 1}
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
          <WordExtendedInfo gameState={this.props.getState()} playWord={() => this.playWord()} gameScore={this.state} />
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
            className={
              this.state.isAnswer ? 'btn btn-warning btn-lg next-word' : 'btn btn-outline-warning btn-lg next-word'
            }
            onClick={() => this.nextButton()}
          >
            Next
          </button>
          <button
            disabled={this.state.isAnswer}
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.checkAnswer(false)}
          >
            Skip word
          </button>
        </div>
      </div>
    );
  }
}

export default PlayAudiocall;
