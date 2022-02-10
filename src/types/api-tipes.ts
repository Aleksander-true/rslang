export type Optional = {
  sprint: GameOptional;
  audio: GameOptional;
  wordStatistics: Record<string, WordStatisticsType>; //string формата 03.02.2022
};

export type WordStatisticsType = {
  correctAnswers: number;
  mistakes: number;
  newWords: number;
  learnedWords: number;
};

export type GameOptional = {
  correctAnswers: number; //общее число угаданных слов сегодня
  lastChanged: string; // текущая дата
  newWords: number; // новых слов сегодня
  longestSeries: number; // максимально правильных ответов подряд
  wrongAnswers: number; // ошибок сегодня
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

export type UserWord = {
  difficulty: string;
  optional: Optional;
};

export type Statistic = {
  learnedWords: string;
  optional: Optional;
};

export type Setting = {
  wordsPerDay: string;
  optional: Optional;
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
