export type OptionalStatistic = {
  sprint: GameOptional;
  audio: GameOptional;
  wordStatistics: Record<string, WordStatisticsType>;
};

export type OptionalUserWord = {
  isLearned: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  progress: number;
  time: string;
};

export type OptionalSetting = {};

export type WordStatisticsType = {
  correctAnswers: number;
  mistakes: number;
  newWords: number;
  learnedWords: number;
};

export type GameOptional = {
  correctAnswers: number;
  lastChanged: string;
  newWords: number;
  longestSeries: number;
  wrongAnswers: number;
  totalScore: number;
};

export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

type AggregatedWord = {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type UserWord = {
  difficulty: string;
  optional?: Partial<OptionalUserWord>;
};

export type Statistic = {
  learnedWords: number;
  optional: OptionalStatistic;
};

export type Setting = {
  wordsPerDay: number;
  optional: OptionalSetting;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  email: string;
  password: string;
};

export type Auth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type APIOptions = {
  method: string;
  withCredentials?: boolean;
  headers: APIOptionsHeaders;
  body?: string;
};

export type APIOptionsHeaders = {
  Authorization?: string;
  Accept: string;
  'Content-Type'?: string;
};

type AggregatedWordsFilterType = Record<
  string,
  Array<Record<string, null | string | boolean | number | Array<Record<string, null | string | boolean | number>>>>
>;
