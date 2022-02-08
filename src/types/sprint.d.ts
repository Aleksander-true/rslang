import { WordFromCollection } from "../Pages/SprintGame/words";

type SprintQuestionsPropsType = {

    setCorrectWords: React.Dispatch<React.SetStateAction<WordFromCollection[]>>;
    setWrongWords: React.Dispatch<React.SetStateAction<WordFromCollection[]>>;
    answers: string[];
    currentWords: WordFromCollection[];
}

type ShowEnglishWordPropsType = {
    words: WordFromCollection[];
    wordNum: number;
}

type SprintGameInsidePropsType = {
    answers:string[];
    currentWords:WordFromCollection[]
}