import api from "../../API";
import { optionalStatistics, optionalWord } from "../../Types/sprint";
import { formDate } from "./util";
import { WordFromCollection } from "./WordsAPI";

export const clickApiActions = async (answer: boolean, currentWords: WordFromCollection[], wordNum: number, maxSeries: number) => {
    const date = new Date();
    const wordResponse = await api.getWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token'));
    const statisticsResponse = await api.getWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token'))

    const statistics: optionalStatistics = setStatistics(date);
    const words: optionalWord = setWord(date);

    if (statisticsResponse?.isSuccess) {
        statistics.optional = await statisticsResponse.data.optional;
        statistics.learnedWords = await statisticsResponse.data.learnedWords;
        console.log(statistics);
    }

    if (wordResponse?.isSuccess) {
        words.optional = await wordResponse.data.optional;
        words.difficulty = await wordResponse.data.difficulty;
        console.log(words);
    }

    const newDataToAPI = await update(words, statistics, answer, date, maxSeries, currentWords[wordNum].id);

    if (wordResponse?.isSuccess) {
        api.updateWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token'), newDataToAPI.wordFromBase);
    } else api.createWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token'), newDataToAPI.wordFromBase)

    api.upsertStatistics(localStorage.getItem('userId'), localStorage.getItem('token'), newDataToAPI.statistics);

}

const update = async (wordFromBase: optionalWord, statistics: optionalStatistics, answer: boolean, date: Date, maxSeries: number, id: string) => {

    console.log(wordFromBase);
    console.log(statistics);

    if (statistics.optional.sprint.lastChanged !== formDate(date)) {
        statistics.optional.sprint = setNewDayStatistics(date);
    }

    if (answer) {
        wordFromBase.optional!.guessed += 1
        wordFromBase.optional!.progress += 1
        if ((wordFromBase.optional!.progress > 4 && wordFromBase.difficulty === "difficult") || (wordFromBase.optional!.progress > 2 && wordFromBase.difficulty === "studying")) {
            wordFromBase.difficulty = "learned";
            statistics.learnedWords += 1;
        }
        statistics.optional.sprint.correctAnswers += 1;
        if (statistics.optional.sprint.longestSeries < maxSeries) {
            statistics.optional.sprint.longestSeries = maxSeries
        };
        wordFromBase.optional!.time = formDate(date);

    } else {
        wordFromBase.optional!.progress = 0;
        if (wordFromBase.difficulty === "learned") {
            wordFromBase.difficulty = "studying";
        }

        statistics.optional.sprint.wrongAnswers += 1;

        wordFromBase.optional!.mistakes += 1;
        wordFromBase.optional!.time = formDate(date);
    }

    console.log(wordFromBase);
    console.log(statistics);

    return {wordFromBase, statistics};
}
    
const setWord = (date: Date) => {
    const word = {
        difficulty: 'studying',
        optional: {
            guessed: 0,
            mistakes: 0,
            progress: 0,
            time: formDate(date),
        }
    }
    return word;
}

const setNewDayStatistics = (date: Date) => {
    return {
        correctAnswers: 0,
        lastChanged: formDate(date),
        newWords: 0,
        longestSeries: 0,
        wrongAnswers: 0,
    };
}

const setStatistics = (date: Date) => {
    const statistics: optionalStatistics = {
        learnedWords: 0,
        optional: {
            sprint: {
                correctAnswers: 0,
                lastChanged: formDate(date),
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
            },
            audio: {
                correctAnswers: 0,
                lastChanged: formDate(date),
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
            },
            wordStatistics: {},
        }
    }
    return statistics;
}