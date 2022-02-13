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
  difficulty: string;
  optional?: {
    isLearned: boolean;
    correctAnswers: number;
    wrongAnswers: number;
  };
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

type GetDifficultWordsData = [{ paginatedResults: DifficultWord[] | never[]; totalCount: { count: number } }];

type LevelProps = {
  levelNumber: string;
  levelName: string;
  levelLetter: string;
};

type WordListProps = {
  words: Word[];
  clickWord: (string) => void;
  difficultWords: GetDifficultWordsData;
  currentWord: CurrentWord;
};

type WordCardProps = {
  words: Word[];
  currentWord: CurrentWord;
  updateDifficultWords: () => void;
  difficultWords: GetDifficultWordsData;
};

type WordsProps = { words: never[] | Word[] };

type CurrentWord = { id: string; level: number };
