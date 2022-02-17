import { Word, Statistic, UserWord, AggregatedWord } from '../../types/api-tipes';

export type AudioGameState = {
  date: string;
  isAuthorised: boolean;
  isStarted: boolean;
  isFinished: boolean;
  isRequesting: boolean;
  isWordStatistic: boolean;
  isWordOnServer: boolean;
  difficulty: number;
  currentRound: number;
  correctAnswer: string;
  russianWords: string[];
  answers: string[];
  collection: Word[];
  gameResults: RoundResult[];
  roundLength: number;
  gameScore: number;
  audioSrc: string;
  userID: string;
  statisticGame: Statistic;
  statisticWord: UserWord;
};

export type ResponseType = { isSuccess: boolean; data: Word[] };

type ResponseUserWordType = {
  isSuccess: boolean;
  data: UserWord | ErrorMessage;
};

type ResponseStatisticType = {
  isSuccess: boolean;
  data: Statistic | ErrorMessage;
};

type ErrorMessage = { errorMessage: string };

type AggregatedResponseType = {
  isSuccess: boolean;
  data: [
    {
      paginatedResults: Array<AggregatedWord>;
      totalCount: Array<Record<string, number>>;
    }
  ];
};

export type AnswerButtonState = {
  value: string;
  isCorrect: boolean;
  timer: ReturnType<typeof setTimeout>;
};

export type RoundResult = {
  word: string;
  translate: string;
  audioSrc: string;
  isGuessed: boolean;
};

export type GameState = {
  roundScore: number;
  gameScore: number;
  correctSeries: number;
  multiplier: string;
  isAnswer: boolean;
  isPreAnswer: boolean;
  gameResults: RoundResult[];
};

export type WordExtendedInfoState = {
  className: string;
};

export type ArgumentCheckAnswer = {
  isCorrect: boolean;
  value: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type PropsStartAudiocall = {
  startGame: () => Promise<void>;
  setDifficulty: (number: number) => void;
  getDifficulty: () => number;
};

export type PropsResultsAudiocall = {
  results: RoundResult[];
  resetGame: () => void;
  finalResult: AudioGameState;
};

export type PropsSelectDifficulty = {
  onChange: (value: string) => void;
};

export type PropsPlayAudiocall = {
  nextRound: () => void;
  setResult: (array: RoundResult[]) => void;
  getState: () => AudioGameState;
  resetGame: () => void;
  finishGame: () => void;
  updateStatistic: (gameScore: number, gameStatistic: Statistic) => void;
  changeStatisticFlag: () => void;
};

export type PropsAnswerButton = {
  id: number;
  isCorrect: boolean;
  value: string;
  onClick: (isCorrect: boolean, value: string) => void;
};

export type PropsBlockedButton = {
  possibleClasses: string[];
  isCorrect: boolean;
  value: string;
};

export type PropsWordInfo = {
  playWord: () => void;
};

export type PropsWordExtendedInfo = {
  gameState: AudioGameState;
  playWord: () => void;
  gameScore: GameState;
};
