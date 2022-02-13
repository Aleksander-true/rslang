import api from "../../API";
import { Statistic, UserWord } from "../../Types/api-tipes";
import { formDate } from "./util";
import { WordFromCollection } from "./WordsAPI";

export const clickApiActions = async (answer: boolean, currentWords: WordFromCollection[], wordNum: number, maxSeries: number, score: number) => {
    const date = new Date();
    const wordResponse = await api.getWord(localStorage.getItem('userId')!, currentWords[wordNum].id, localStorage.getItem('token')!);
    const statisticsResponse = await api.getStatistics(localStorage.getItem('userId')!, localStorage.getItem('token')!)

    const statistics: Statistic = setStatistics(date);
    const words: UserWord = setWord(date);

    console.log(statisticsResponse);

    if (statisticsResponse?.isSuccess) {
        statistics.optional = await statisticsResponse.data.optional;
        statistics.learnedWords = await statisticsResponse.data.learnedWords;
    }

    if (wordResponse?.isSuccess) {
        words.optional = await wordResponse.data.optional;
        words.difficulty = await wordResponse.data.difficulty;
    }

    if (!wordResponse?.isSuccess) {
        statistics.optional.sprint.newWords += 1;
    }

    const newDataToAPI = await update(words, statistics, answer, date, maxSeries, currentWords[wordNum].id);

    if (wordResponse?.isSuccess) {
        api.updateWord(localStorage.getItem('userId')!, currentWords[wordNum].id, localStorage.getItem('token')!, newDataToAPI.wordFromBase);
    } else api.createWord(localStorage.getItem('userId')!, currentWords[wordNum].id, localStorage.getItem('token')!, newDataToAPI.wordFromBase)

    console.log(newDataToAPI.statistics);
   const ifSetStat =  api.upsertStatistics(localStorage.getItem('userId')!, localStorage.getItem('token')!, newDataToAPI.statistics);
 console.log(ifSetStat)
}

const update = async (wordFromBase: UserWord, statistics: Statistic, answer: boolean, date: Date, maxSeries: number, id: string) => {

    console.log(wordFromBase);
    console.log(statistics);

    wordFromBase.optional.time = formDate(date);

    if (statistics.optional.sprint.lastChanged !== formDate(date)) {
        statistics.optional.sprint = setNewDayStatistics(date);
    }

    if (answer) {
        wordFromBase.optional!.correctAnswers += 1
        wordFromBase.optional!.progress! += 1
        if ((wordFromBase.optional!.progress! > 4 && wordFromBase.difficulty === "hard") || (wordFromBase.optional!.progress! > 2 && wordFromBase.difficulty === "easy")) {
            wordFromBase.optional.isLearned = true;
            statistics.learnedWords += 1;
        }
        statistics.optional.sprint.correctAnswers += 1;
        if (statistics.optional.sprint.longestSeries < maxSeries) {
            statistics.optional.sprint.longestSeries = maxSeries
        };
        wordFromBase.optional!.time = formDate(date);

    } else {
        wordFromBase.optional!.progress = 0;
        if (wordFromBase.optional.isLearned) {
            wordFromBase.optional.isLearned = false;
        }

        statistics.optional.sprint.wrongAnswers += 1;
        wordFromBase.optional!.wrongAnswers += 1;
        wordFromBase.optional!.time = formDate(date);
    }

    console.log(wordFromBase);
    console.log(statistics);

    return {wordFromBase, statistics};
}
    
const setWord = (date: Date) => {
    const word: UserWord = {
        difficulty: 'easy',
        optional: {
            isLearned: false,
            correctAnswers: 0,
            wrongAnswers: 0,
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
        totalScore: 0,
    };
}

const setStatistics = (date: Date) => {
    const statistics: Statistic = {
        learnedWords: 0,
        optional: {
            sprint: {
                correctAnswers: 0,
                lastChanged: formDate(date),
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            },
            audio: {
                correctAnswers: 0,
                lastChanged: formDate(date),
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            },
            wordStatistics: {},
        }
    }
    return statistics;
}