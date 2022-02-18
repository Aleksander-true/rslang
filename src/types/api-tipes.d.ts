export type OptionalStatistic = {
  sprint: GameOptional;
  audio: GameOptional;
  wordStatistics: Record<string, WordStatisticsType>; //string формата 03.02.2022
};

export type OptionalUserWord = {
  // isNew: boolean; //true - впервые использовано в играх вне зависимости, открывались игры на странице учебника или по ссылке в меню
  isLearned: boolean; //true - угадано подряд 3 (если difficulty = 'easy') или 5 (если difficulty = 'hard') раз. false - если игрок ошибся
  correctAnswers: number; //сколько раз это слово угадано
  wrongAnswers: number; //сколько раз это слово НЕ угадано
  progress: number; // сколько раз угадано подряд
  time: string;
};

export type OptionalSetting = {
  // todo
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
  totalScore: number; // очки. предлагаю очками считать проценты. угадал 50% слов - получил 50 очков
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
  difficulty: 'easy'|'hard';
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
