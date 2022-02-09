import api from "../../API";
import { optional, optionalStatistics } from "../../Types/sprint";
import { formDate } from "./util";
import { WordFromCollection } from "./WordsAPI";

export const clickApiActions = async (answer: boolean, currentWords: WordFromCollection[], wordNum: number, maxSeries: number) => {
    const date = new Date();

    const wordFromBase: {
        difficulty?: string,
        optional?: optional,
    } = (await api.getWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token')))!.data;

    const statistics: optionalStatistics = (await api.getWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token')))!.data;
    if (statistics.optional.sprint.lastChanged !== formDate(date)) {
        statistics.optional.sprint.lastChanged = formDate(date);
        statistics.optional.sprint.wrongAnswers = 0;
        statistics.optional.sprint.correctAnswers = 0;
        statistics.optional.sprint.longestSeries = 0;
        statistics.optional.sprint.newWords = 0;
    }

    if (answer) {
        wordFromBase.optional!.guessed += 1
        wordFromBase.optional!.progress += 1
        if ((wordFromBase.optional!.progress > 4 && wordFromBase.difficulty === "difficult") || (wordFromBase.optional!.progress > 2 && wordFromBase.difficulty === "studying")) {
            wordFromBase.difficulty = "learned";
            statistics.learnedWords += 1;
        }
        statistics.optional.sprint.correctAnswers += 1;
        if(statistics.optional.sprint.longestSeries < maxSeries) {
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

    api.updateWord(localStorage.getItem('userId'), currentWords[wordNum].id, localStorage.getItem('token'), wordFromBase);
    api.upsertStatistics(localStorage.getItem('userId'), localStorage.getItem('token'), statistics);
}
