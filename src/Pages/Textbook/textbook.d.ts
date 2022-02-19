type Word = {
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

type UserWord = {
  difficulty: 'easy' | 'hard';
  optional?: {
    isLearned: boolean;
    correctAnswers: number;
    wrongAnswers: number;
  };
};

type GetUserWordResponse = {
  isSuccess: boolean;
  data: UserWord;
};

type DifficultWord = {
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
  userWord?: UserWord;
};

type SetWords = Dispatch<SetStateAction<never[] | Word[]>>;

type GetWordsData = never[] | Word[];

type GetUserWordsData = [{ paginatedResults: DifficultWord[] | never[]; totalCount: { count: number } }];

type LevelProps = {
  levelNumber: string;
  levelName: string;
  levelLetter: string;
  level: string;
};

type WordListProps = {
  words: Word[];
  clickWord: (string) => void;
  userWords: GetUserWordsData;
  currentWord: CurrentWord;
  isLearnedAllWords: boolean;
};

type DifficultWordListProps = {
  clickWord: (string) => void;
  userWords: GetUserWordsData;
  currentWord: CurrentWord;
};

type DifficultWordCardProps = {
  currentWord: CurrentWord;
  updateUserWords: (group?: string, page?: string) => void;
  userWords: GetUserWordsData;
};

type WordCardProps = {
  words: Word[];
  currentWord: CurrentWord;
  updateUserWords: (group?: string, page?: string) => void;
  userWords: GetUserWordsData;
  isLearnedAllWords: boolean;
};

type WordsProps = { words: never[] | Word[] };

type PaginationProps = {
  page: number;
  lastPage: number;
  level: string;
  isLearnedAllWords: boolean;
};
