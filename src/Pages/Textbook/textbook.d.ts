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

type SetWords = Dispatch<SetStateAction<never[] | Word[]>>;

type GetWordsData = never[] | Word[];

type LevelProps = {
  levelNumber: string;
  levelName: string;
  levelLetter: string;
};

type WordListProps = { words: Word[]; clickWord: (string) => void };

type WordCardProps = { words: Word[]; currentWordId: string };
