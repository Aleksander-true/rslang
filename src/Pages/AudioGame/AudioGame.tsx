import React from 'react';
import './audio-call.css';
import { BASE_URL } from '../../constants';
import api from '../../API';
import StartAudiocall from './StartAudiocall';
import PlayAudiocall from './PlayAudiocall';
import ResultsAudiocall from './ResultsAudiocall';
import { AudioGameState } from './audiocall-types';
import { ResponseType } from './audiocall-types';
import { RoundResult } from './audiocall-types';
import { getRandomIntInclusive } from './functions-helpers';
import { shuffle } from './functions-helpers';

class AudioGame extends React.Component<{}> {
  state: AudioGameState;

  constructor(props: {}) {
    super(props);
    this.state = {
      isStarted: false,
      isFinished: false,
      difficulty: 0,
      currentRound: 0,
      correctAnswer: '',
      russianWords: [],
      answers: [],
      collection: [],
      gameResults: [],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  finishGame() {
    this.setState({
      isStarted: true,
      isFinished: true,
    });
  }

  async startGame(group: number, page?: number) {
    let response: ResponseType;
    if (!page) {
      response = (await api.getChunkOfWords(String(group), String(getRandomIntInclusive(0, 29)))) as ResponseType;
    } else {
      response = (await api.getChunkOfWords(String(group), String(page))) as ResponseType;
    }
    this.setDefaultSettings();
    if (response.isSuccess) {
      this.setState({
        collection: response.data,
      });
    } else {
      return;
    }
    this.state.collection.forEach((w) => this.state.russianWords.push(w.wordTranslate));
    this.round(this.state.currentRound);
    this.setState({
      isStarted: true,
      isFinished: false,
    });
  }

  round(num: number) {
    if (num === 20) {
      console.log(this.state.gameResults);
      this.setState({
        isFinished: true,
      });
    }
    const correctAnswer = this.state.collection[num].wordTranslate;
    this.setState({
      currentRound: num,
      correctAnswer: correctAnswer,
    });
    shuffle(this.state.russianWords);
    let answers = [];
    let i = 0;
    while (answers.length < 4) {
      if (this.state.russianWords[i] !== correctAnswer) {
        answers.push(this.state.russianWords[i]);
      }
      i++;
    }
    answers.push(correctAnswer);
    shuffle(answers);
    this.setState({
      answers: answers,
    });
    const wordAudio = new Audio();
    wordAudio.src = `${BASE_URL}/${this.state.collection[num].audio}`;
    wordAudio.play();
  }

  resetGame() {
    this.setState({
      isStarted: false,
      isFinished: false,
      difficulty: 0,
    });
  }

  setDifficulty(number: number) {
    this.setState({
      difficulty: number,
    });
  }

  getDifficulty() {
    return this.state.difficulty;
  }

  setDefaultSettings() {
    this.setState({
      isStarted: false,
      isFinished: false,
      difficulty: 0,
      currentRound: 0,
      correctAnswer: '',
      russianWords: [],
      answers: [],
      collection: [],
      gameResults: [],
    });
  }

  getState() {
    return this.state;
  }

  setResult(array: RoundResult[]) {
    this.setState({
      gameResults: array,
    });
  }

  render() {
    return (
      <section className="audiocall-section">
        {this.state.isStarted ? null : (
          <StartAudiocall
            startGame={() => this.startGame(this.state.difficulty)}
            setDifficulty={(number: number) => this.setDifficulty(number)}
            getDifficulty={() => this.getDifficulty()}
          />
        )}
        {this.state.isStarted && !this.state.isFinished ? (
          <PlayAudiocall
            nextRound={() => this.round(this.state.currentRound + 1)}
            setResult={(array: RoundResult[]) => this.setResult(array)}
            getState={() => this.getState()}
            resetGame={() => this.resetGame()}
            finishGame={() => this.finishGame()}
          />
        ) : null}
        {this.state.isFinished ? (
          <ResultsAudiocall results={this.state.gameResults} resetGame={() => this.resetGame()} />
        ) : null}
      </section>
    );
  }
}

export default AudioGame;
