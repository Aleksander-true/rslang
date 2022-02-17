import { Word } from '../../Types/api-tipes';

export type AudioGameState = {
  isStarted: boolean;
  isFinished: boolean;
  difficulty: number;
  currentRound: number;
  correctAnswer: string;
  russianWords: string[];
  answers: string[];
  collection: Word[];
  gameResults: RoundResult[];
  roundLength: number;
  audioSrc: string;
  userID: string;
};

export type ResponseType = { isSuccess: boolean; data: Word[] };

export type AnswerButtonState = {
  value: string;
  isCorrect: boolean;
};

export type RoundResult = {
  word: string;
  translate: string;
  audioSrc: string;
  isGuessed: boolean;
};

export type GameState = {
  isAnswer: boolean;
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
};

export type PropsAnswerButton = {
  isCorrect: boolean;
  onClick: (isCorrect: boolean, value: string) => void;
  value: string;
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
};
