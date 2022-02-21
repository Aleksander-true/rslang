import React from 'react';
import './audio-call.css';
import { BASE_URL } from '../../constants';
import api from '../../API';
import whatWords from '../../Components/whatWords';
import { AggregatedWordsFilterType, AggregatedWord, GameOptional, WordStatisticsType } from '../../Types/api-tipes';
import { Statistic, UserWord } from '../../Types/api-tipes';
import StartAudiocall from './StartAudiocall';
import PlayAudiocall from './PlayAudiocall';
import ResultsAudiocall from './ResultsAudiocall';
import Requesting from './Requesting';
import { AudioGameState, ResponseType, RoundResult, AggregatedResponseType } from './audiocall-types';
import { ResponseStatisticType, ErrorMessage, ResponseUserWordType } from './audiocall-types';
import { getRandomIntInclusive, shuffle, returnsStatisticTemplate, dateConstructor } from './functions-helpers';
import { returnsWordStatisticTemplate, returnsStatisticGameTemplate } from './functions-helpers';
import { returnsStatisticWordsTemplate } from './functions-helpers';

class AudioGame extends React.Component<{}> {
  state: AudioGameState;

  constructor(props: {}) {
    super(props);
    this.state = {
      date: dateConstructor(),
      isStartedFromManual: Boolean(whatWords.level) && Boolean(whatWords.page),
      isAuthorised: false,
      isStarted: false,
      isFinished: false,
      isRequesting: false,
      isWordStatistic: false,
      isWordOnServer: false,
      difficulty: 0,
      currentRound: 0,
      correctAnswer: '',
      russianWords: [],
      answers: [],
      collection: [],
      gameResults: [],
      roundLength: 20,
      gameScore: 0,
      audioSrc: '',
      userID: localStorage.getItem('userId') as string,
      statisticGame: returnsStatisticTemplate(dateConstructor()),
      statisticWord: returnsWordStatisticTemplate(dateConstructor()),
    };
  }

  componentDidMount() {
    this.setDefaultSettings(false);
  }

  componentWillUnmount() {
    this.setDefaultSettings(false);
  }

  finishGame() {
    this.setState({
      isStarted: true,
      isFinished: true,
    });
  }

  async normaliseAggregatedResponse(response: AggregatedResponseType, page?: number): Promise<ResponseType> {
    let wordsIn = response.data[0].paginatedResults.slice();
    if (page !== undefined) {
      wordsIn.sort((a, b) => {
        return a.page - b.page;
      });
      let biggerPageIndex = wordsIn.length;
      wordsIn.some((currentValue, index) => {
        if (currentValue.page > page) {
          biggerPageIndex = index;
        }
        return currentValue.page > page;
      });
      wordsIn = wordsIn.slice(0, biggerPageIndex);
      let lastSmallerPageIndex = 0;
      wordsIn.some((currentValue, index) => {
        if (currentValue.page === page) {
          lastSmallerPageIndex = index - 1;
        }
        return currentValue.page === page;
      });
      const tempArr = wordsIn.splice(lastSmallerPageIndex + 1, Infinity);
      const prevWordsIn = wordsIn;
      wordsIn = tempArr;
      if (wordsIn.length < 20) {
        prevWordsIn.reverse();
        let i = 0;
        while (wordsIn.length < 20) {
          if (!prevWordsIn[i]) {
            break;
          }
          wordsIn.push(prevWordsIn[i]);
          i++;
        }
      }
    }
    const wordsOut = wordsIn.map((e: AggregatedWord) => {
      return {
        id: e._id,
        group: e.group,
        page: e.page,
        word: e.word,
        image: e.image,
        audio: e.audio,
        audioMeaning: e.audioMeaning,
        audioExample: e.audioExample,
        textMeaning: e.textMeaning,
        textExample: e.textExample,
        transcription: e.transcription,
        wordTranslate: e.wordTranslate,
        textMeaningTranslate: e.textMeaningTranslate,
        textExampleTranslate: e.textExampleTranslate,
      };
    });
    return { isSuccess: true, data: wordsOut } as ResponseType;
  }

  async changeIsRequestingStatus() {
    await new Promise<void>((resolve) => {
      this.setState(
        {
          isRequesting: !this.state.isRequesting,
        },
        () => {
          resolve();
        }
      );
    });
  }

  async getCurrentDate() {
    await new Promise<void>((resolve) => {
      this.setState(
        {
          date: dateConstructor(),
        },
        () => {
          resolve();
        }
      );
    });
  }

  async deleteUser() {
    const result = await api.deleteUser(this.state.userID, localStorage.getItem('token') as string);
    return result;
  }

  async startGame(menuGroup?: number) {
    //await api.deleteWord(this.state.userID, '5e9f5ee35eb9e72bc21af4a0', localStorage.getItem('token') as string);
    //await this.deleteUser();
    console.log(this.state.isStartedFromManual);
    await new Promise<void>((resolve) => {
      this.setState(
        {
          userID: localStorage.getItem('userId') as string,
        },
        () => resolve()
      );
    });
    if (this.state.userID !== null) {
      await new Promise<void>((resolve) => {
        this.setState(
          {
            isAuthorised: true,
          },
          () => resolve()
        );
      });
    }
    let response: ResponseType;
    let aggregatedResponse: AggregatedResponseType;
    let filter: AggregatedWordsFilterType;
    const group = whatWords.level;
    const page = whatWords.page;
    await this.changeIsRequestingStatus();
    if (group === null && page === null) {
      response = (await api.getChunkOfWords(String(menuGroup), String(getRandomIntInclusive(0, 29)))) as ResponseType;
      if (response.isSuccess) {
        this.setState({
          collection: response.data,
        });
      } else {
        return;
      }
    } else if (Number(group) !== 6) {
      filter = {
        $or: [{ 'userWord.optional.isLearned': false }, { userWord: null }],
      };
      aggregatedResponse = (await api.getAllUserAggregatedWords(
        this.state.userID,
        localStorage.getItem('token') as string,
        String(group),
        undefined,
        '600',
        JSON.stringify(filter)
      )) as AggregatedResponseType;
      if (aggregatedResponse.isSuccess) {
        response = await this.normaliseAggregatedResponse(aggregatedResponse, Number(page));
        if (response.data.length < this.state.roundLength) {
          let currentLength = response.data.length;
          let currentGroup = Number(group);
          while (currentLength < this.state.roundLength) {
            if (currentGroup === 0) {
              break;
            }
            currentGroup -= 1;
            let newAggregatedResponse = (await api.getAllUserAggregatedWords(
              this.state.userID,
              localStorage.getItem('token') as string,
              String(currentGroup),
              undefined,
              '600',
              JSON.stringify(filter)
            )) as AggregatedResponseType;
            let newResponse = await this.normaliseAggregatedResponse(newAggregatedResponse, currentGroup);
            response.data = response.data.concat(newResponse.data);
            if (response.data.length > this.state.roundLength) {
              response.data = response.data.slice(0, 20);
            }
            currentLength = response.data.length;
          }
        }
      } else {
        return;
      }
    } else {
      filter = {
        $and: [{ 'userWord.difficulty': 'hard' }],
      };
      aggregatedResponse = (await api.getAllUserAggregatedWords(
        this.state.userID,
        localStorage.getItem('token') as string,
        undefined,
        undefined,
        '3600',
        JSON.stringify(filter)
      )) as AggregatedResponseType;
      if (aggregatedResponse.isSuccess) {
        response = await this.normaliseAggregatedResponse(aggregatedResponse);
      } else {
        return;
      }
    }
    await this.setDefaultSettings(true);
    await this.getCurrentDate();
    const statResult = await this.getStatistic();
    if (!statResult) {
      return;
    }
    let russianWords: string[] = [];
    response.data.forEach((w) => russianWords.push(w.wordTranslate));
    if (russianWords.length < 20) {
      let tempSet = new Set(russianWords);
      const potentialAnswers = (await api.getChunkOfWords(
        String(getRandomIntInclusive(0, 5)),
        String(getRandomIntInclusive(0, 29))
      )) as ResponseType;
      if (response.isSuccess) {
        let i = 0;
        while (tempSet.size < 20) {
          tempSet.add(potentialAnswers.data[i].wordTranslate);
          i++;
        }
        russianWords = Array.from(tempSet);
      } else {
        return;
      }
    }
    this.setState(
      {
        russianWords: russianWords,
        collection: response.data,
        roundLength: response.data.length,
      },
      () => {
        this.round(this.state.currentRound);
      }
    );
    this.setState({
      isStarted: true,
      isFinished: false,
    });
    await this.changeIsRequestingStatus();
  }

  async sendStatistic() {
    if (!this.state.isAuthorised) {
      return true;
    }
    const ID = this.state.userID;
    const token = localStorage.getItem('token') as string;
    const requestBody = this.state.statisticGame;
    const response = await api.upsertStatistics(ID, token, requestBody);
    return response?.isSuccess;
  }

  playEnd() {
    const end = new Audio(require('../../assets/audio/end.mp3'));
    end.play();
  }

  async round(num: number) {
    if (num === this.state.roundLength) {
      this.setState(
        {
          isStarted: false,
          isFinished: false,
          isRequesting: true,
        },
        async () => {
          const result = await this.sendStatistic();
          if (result) {
            this.setState({
              isStarted: true,
              isFinished: true,
              isRequesting: false,
            });
            this.playEnd();
          } else {
            this.setState({
              isStarted: true,
              isFinished: false,
              isRequesting: false,
            });
          }
        }
      );
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
    const wordAudio = new Audio();
    const audioSrc = `${BASE_URL}/${this.state.collection[num].audio}`;
    wordAudio.src = audioSrc;
    this.setState({
      answers: answers,
      audioSrc: audioSrc,
      statisticWord: returnsWordStatisticTemplate(this.state.date),
    });
    wordAudio.play();
    const statResult = await this.getUserWord(num);
    if (!statResult) {
      return;
    } else {
      this.setState({
        isWordStatistic: true,
      });
    }
  }

  async getUserWord(num: number) {
    if (!this.state.isAuthorised) {
      return true;
    }
    const response = (await api.getWord(
      this.state.userID,
      this.state.collection[num].id,
      localStorage.getItem('token') as string
    )) as ResponseUserWordType;
    if (response?.isSuccess) {
      const statisticWord = {
        difficulty: (response.data as UserWord).difficulty,
        optional: {
          isLearned: (response.data as UserWord).optional?.isLearned,
          correctAnswers: (response.data as UserWord).optional?.correctAnswers,
          wrongAnswers: (response.data as UserWord).optional?.wrongAnswers,
          progress: (response.data as UserWord).optional?.progress ? (response.data as UserWord).optional?.progress : 0,
        },
      };
      this.setState({
        isWordOnServer: true,
        statisticWord: statisticWord,
      });
      return true;
    } else {
      if ((response.data as ErrorMessage).errorMessage === "User's word not found") {
        const currentStatistic = this.state.statisticGame;
        currentStatistic.optional.audio.newWords += 1;
        currentStatistic.optional.wordStatistics[this.state.date].newWords = currentStatistic.optional.audio.newWords;
        this.setState({
          isWordOnServer: false,
          statisticGame: currentStatistic,
          statisticWord: returnsWordStatisticTemplate(this.state.date),
        });
        return true;
      } else {
        return false;
      }
    }
  }

  async updateStatistic(gameScore: number, gameStatistic: Statistic) {
    const result = await new Promise<void>((resolve) => {
      this.setState(
        {
          gameScore: gameScore,
          statisticGame: gameStatistic,
        },
        () => resolve()
      );
    });
    return result;
  }

  async getStatistic() {
    if (!this.state.isAuthorised) {
      return true;
    }
    const response = (await api.getStatistics(
      this.state.userID,
      localStorage.getItem('token') as string
    )) as ResponseStatisticType;
    if (response?.isSuccess) {
      let audiocall: GameOptional;
      let today: WordStatisticsType;
      const statistic = response.data as Statistic;
      if (statistic.optional.audio.lastChanged === this.state.date) {
        audiocall = statistic.optional.audio;
      } else {
        audiocall = returnsStatisticGameTemplate(this.state.date);
      }
      if (statistic.optional.wordStatistics[this.state.date]) {
        today = statistic.optional.wordStatistics[this.state.date];
      } else {
        today = returnsStatisticWordsTemplate(this.state.date)[this.state.date];
      }
      let newStatistic: Statistic = {
        learnedWords: statistic.learnedWords,
        optional: {
          sprint: statistic.optional.sprint,
          audio: audiocall,
          wordStatistics: statistic.optional.wordStatistics,
        },
      };
      newStatistic.optional.wordStatistics[this.state.date] = today;
      await new Promise<void>((resolve) => {
        this.setState(
          {
            statisticGame: newStatistic,
          },
          () => resolve()
        );
      });
      return true;
    } else {
      if ((response.data as ErrorMessage).errorMessage === 'Statistics not found') {
        await new Promise<void>((resolve) => {
          this.setState(
            {
              statisticGame: returnsStatisticTemplate(this.state.date),
            },
            () => resolve()
          );
        });
        return true;
      } else {
        return false;
      }
    }
  }

  changeStatisticFlag() {
    this.setState({
      isWordStatistic: true,
    });
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

  async setDefaultSettings(showDolphins: boolean) {
    await new Promise<void>((resolve) => {
      this.setState(
        {
          date: dateConstructor(),
          isAuthorised: this.state.userID !== null,
          isStartedFromManual: this.getManualState(),
          isStarted: false,
          isFinished: false,
          isRequesting: showDolphins,
          isWordStatistic: false,
          isWordOnServer: false,
          difficulty: 0,
          currentRound: 0,
          correctAnswer: '',
          russianWords: [],
          answers: [],
          collection: [],
          gameResults: [],
          roundLength: 20,
          gameScore: 0,
          audioSrc: '',
          statisticGame: returnsStatisticTemplate(dateConstructor()),
          statisticWord: returnsWordStatisticTemplate(dateConstructor()),
        },
        () => {
          resolve();
        }
      );
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

  async setManualState() {
    const result = await new Promise((resolve) => {
      this.setState(
        {
          isStartedFromManual: Boolean(whatWords.level) && Boolean(whatWords.page),
        },
        () => {
          resolve(this.state.isStartedFromManual);
        }
      );
    });
    return result;
  }

  getManualState() {
    return this.state.isStartedFromManual;
  }

  render() {
    return (
      <section className="audiocall-section">
        {this.state.isStarted ? null : this.state.isRequesting ? (
          <Requesting />
        ) : (
          <StartAudiocall
            startGame={(level: number) => this.startGame(level)}
            setDifficulty={(number: number) => this.setDifficulty(number)}
            getDifficulty={() => this.getDifficulty()}
            setManualState={() => this.setManualState() as Promise<boolean>}
            getManualState={() => this.getManualState()}
          />
        )}
        {this.state.isStarted && !this.state.isFinished ? (
          <PlayAudiocall
            nextRound={() => this.round(this.state.currentRound + 1)}
            setResult={(array: RoundResult[]) => this.setResult(array)}
            getState={() => this.getState()}
            resetGame={() => this.resetGame()}
            finishGame={() => this.finishGame()}
            updateStatistic={async (gameScore, gameStatistic) => await this.updateStatistic(gameScore, gameStatistic)}
            changeStatisticFlag={() => this.changeStatisticFlag()}
          />
        ) : null}
        {this.state.isFinished ? (
          <ResultsAudiocall
            results={this.state.gameResults}
            resetGame={() => this.resetGame()}
            finalResult={this.state}
          />
        ) : null}
      </section>
    );
  }
}

export default AudioGame;
