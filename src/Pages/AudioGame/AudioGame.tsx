import React from 'react';
import './audio-call.css';
import { BASE_URL } from '../../constants';
import api from '../../API';
import { Word } from '../../Types/api-tipes';
import StartAudiocall from './StartAudiocall';
import PlayAudiocall from './PlayAudiocall';
import ResultsAudiocall from './ResultsAudiocall';
import { AudioGameState, ResponseType, RoundResult } from './audiocall-types';
import { getRandomIntInclusive, shuffle } from './functions-helpers';

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
      roundLength: 20,
      audioSrc: '',
      userID: localStorage.getItem('userId') as string,
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

  async checkLearnedWords(response: ResponseType): Promise<ResponseType> {
    const WordsIn = response.data;
    let WordsOut: Word[] = [];
    WordsIn.forEach(async (wordObj) => {
      const userWordInfo = await api.getWord(this.state.userID, wordObj.id, localStorage.getItem('token') as string);
      if (!userWordInfo?.data.optional.isLearned) {
        WordsOut.push(wordObj);
      }
    });

    return { isSuccess: true, data: WordsOut };
  }

  async startGame(group: number, page?: number) {
    let response: ResponseType;
    if (!page) {
      response = (await api.getChunkOfWords(String(group), String(getRandomIntInclusive(0, 29)))) as ResponseType;
      if (response.isSuccess) {
        this.setState({
          collection: response.data,
        });
      } else {
        return;
      }
    } else {
      response = (await api.getChunkOfWords(String(group), String(page))) as ResponseType;
      if (response.isSuccess) {
        response = await this.checkLearnedWords(response);
        if (response.data.length < this.state.roundLength) {
          let currentLength = response.data.length;
          let currentGroup = group;
          let currentPage = page;
          while (currentLength < this.state.roundLength) {
            if (currentGroup === 0 && currentPage === 0) {
              break;
            }
            currentPage -= 1;
            if (currentPage < 0) {
              currentPage = 29;
              currentGroup -= 1;
            }
            let newResponse = (await api.getChunkOfWords(String(currentGroup), String(currentPage))) as ResponseType;
            newResponse = await this.checkLearnedWords(newResponse);
            response.data = response.data.concat(newResponse.data);
            if (response.data.length > this.state.roundLength) {
              response.data = response.data.slice(0, 20);
              break;
            }
            currentLength = response.data.length;
          }
        }
        this.setState({
          collection: response.data,
          roundLength: response.data.length,
        });
      } else {
        return;
      }
    }
    // if (this.state.isUserAuthorised) {
    //   const t = `${this.state.isFinished}`;
    // }
    this.setDefaultSettings();
    this.state.collection.forEach((w) => this.state.russianWords.push(w.wordTranslate));
    this.round(this.state.currentRound);
    this.setState({
      isStarted: true,
      isFinished: false,
    });
  }

  round(num: number) {
    if (num === this.state.roundLength) {
      this.setState({
        isFinished: true,
      });
      return;
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
    // todo add audioSrc
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
      roundLength: 20,
      audioSrc: '',
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
