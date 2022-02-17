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
  difficulty: 'easy'|'hard';
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
};

type WordListProps = {
  words: Word[];
  clickWord: (string) => void;
  userWords: GetUserWordsData;
  currentWord: CurrentWord;
};

type WordCardProps = {
  words: Word[];
  currentWord: CurrentWord;
  updateUserWords: (group?: string, page?: string) => void;
  userWords: GetUserWordsData;
};

type WordsProps = { words: never[] | Word[] };
