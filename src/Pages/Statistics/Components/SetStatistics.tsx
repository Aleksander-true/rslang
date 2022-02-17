import { Statistic } from "../../../Types/api-tipes";
import formDate from "../formDate";

const setStatistics = (date: Date) => {
    const currentDate = formDate(date);
    const statistics: Statistic = {
        learnedWords: 0,
        optional: {
            sprint: {
                correctAnswers: 0,
                lastChanged: currentDate,
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            },
            audio: {
                correctAnswers: 0,
                lastChanged: currentDate,
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            },
            wordStatistics: {
                [currentDate]: {
                    correctAnswers: 0,
                    mistakes: 0,
                    newWords: 0,
                    learnedWords: 0,
                },
            }
        }
    }
    return statistics;
}

export default setStatistics;