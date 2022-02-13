import { WordFromCollection } from "../Pages/SprintGame/WordsAPI";

type SprintQuestionsPropsType = {

    setCorrectWords: React.Dispatch<React.SetStateAction<WordFromCollection[]>>;
    setWrongWords: React.Dispatch<React.SetStateAction<WordFromCollection[]>>;
    answers: string[];
    currentWords: WordFromCollection[];
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

type ShowEnglishWordPropsType = {
    words: WordFromCollection[];
    wordNum: number;
}

type SprintGameInsidePropsType = {
    level: number;
}

type optionalWord = {
    difficulty: string;
    optional: {
        guessed: number;  // сколько раз угадали
        mistakes: number; // сколько раз ошиблись
        progress: number; //сколько раз подряд слово угадано, нужно для того чтобы пометить слово изученным
        time: string; //пишем когда слово появилось в игре последний раз
    }
}

type optionalStatistics = {
    learnedWords: number;
    optional: {
        sprint: {
            correctAnswers: number; //общее число угаданных слов сегодня
            lastChanged: string; // текущая дата
            newWords: number; // новых слов сегодня
            longestSeries: number; // максимально правильных ответов подряд
            wrongAnswers: number; // ошибок сегодня
        }
        audio: {
            correctAnswers: number; //общее число угаданных слов сегодня
            lastChanged: string; // текущая дата
            newWords: number; // новых слов сегодня
            longestSeries: number; // максимально правильных ответов подряд
            wrongAnswers: number; // ошибок сегодня
        }
        wordStatistics: {
            key?: { correctAnswers: number; mistakes: number; newWords: number; learnedWords: number }
        }
    }
}