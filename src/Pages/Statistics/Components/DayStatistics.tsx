import React from "react";
import { Statistic } from "../../../Types/api-tipes";
import formDate from "../formDate";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

type DayStatisticsPropsTypes = {
    statistics: Statistic;
}

const DayStatistics: React.FC<DayStatisticsPropsTypes> = (statistics) => {
    const date = new Date();
    const currentDate = formDate(date);


    const wordsToday = () => {
        if (!statistics.statistics.optional.wordStatistics[currentDate]) {
            return ({
                correctAnswers: 0,
                mistakes: 0,
                newWords: 0,
                learnedWords: 0,
            })
        } else return (statistics.statistics.optional.wordStatistics[currentDate])
    }
    const correctPercent = (wordsToday().correctAnswers + wordsToday().mistakes) ? Math.ceil(wordsToday().correctAnswers / (wordsToday().correctAnswers + wordsToday().mistakes)) : 0;

    const sprintToday = () => {
        if (statistics.statistics.optional.sprint.lastChanged !== currentDate) {
            return ({
                correctAnswers: 0,
                lastChanged: currentDate,
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            })
        } else return (statistics.statistics.optional.sprint)
    }

    const correctPercentSprint = (sprintToday().correctAnswers + sprintToday().wrongAnswers) ? Math.ceil(sprintToday().correctAnswers / (sprintToday().correctAnswers + sprintToday().wrongAnswers)) : 0;

    const audioToday = () => {
        if (statistics.statistics.optional.audio.lastChanged !== currentDate) {
            return ({
                correctAnswers: 0,
                lastChanged: currentDate,
                newWords: 0,
                longestSeries: 0,
                wrongAnswers: 0,
                totalScore: 0,
            })
        } else return (statistics.statistics.optional.audio)
    }

    const correctPercentAudio = (audioToday().correctAnswers + audioToday().wrongAnswers) ? Math.ceil(audioToday().correctAnswers / (audioToday().correctAnswers + audioToday().wrongAnswers)) : 0;


    return (
        <div className="statistics__day">
            <div className="statistics__day__words statistics__day__card">
                <div className="statistics__day__percent">
                    <CircularProgressbar value={correctPercent} maxValue={100} text={`${correctPercent}%`} strokeWidth={50}
                        styles={buildStyles({
                            textSize: '2.5em',
                            pathColor: `#68d4bb`,
                            textColor: 'white',
                            trailColor: '#fc7e53',
                            strokeLinecap: "butt"
                            // backgroundColor: '#3e98c7',
                        })} />
                    <p className="statistics__day__subscription">Правильных ответов</p>
                </div>
                <div>
                    <p>{wordsToday().newWords}</p>
                    <p className="statistics__day__subscription">Новых слов</p>
                </div>
                <div>
                    <p>{wordsToday().learnedWords}</p>
                    <p className="statistics__day__subscription">Изучено слов</p>
                </div>
            </div>

            <div className="statistics__day__sprint statistics__day__card">
                <div className="statistics__day__percent">
                    <CircularProgressbar value={correctPercentSprint} maxValue={100} text={`${correctPercentSprint}%`} strokeWidth={50}
                        styles={buildStyles({
                            textSize: '2.5em',
                            pathColor: `#68d4bb`,
                            textColor: 'white',
                            trailColor: '#fc7e53',
                            strokeLinecap: "butt"
                            // backgroundColor: '#3e98c7',
                        })} />
                    <p className="statistics__day__subscription">Правильных ответов</p>
                </div>
                <div>
                    <p>{sprintToday().newWords}</p>
                    <p className="statistics__day__subscription">Новых слов</p>
                </div>
                <div>
                    <p>{sprintToday().longestSeries}</p>
                    <p className="statistics__day__subscription">Самая длинная серия</p>
                </div>
                <div>
                    <p>{sprintToday().totalScore}</p>
                    <p className="statistics__day__subscription">Лучший балл</p>
                </div>
            </div>

            <div  className="statistics__day__audio statistics__day__card">
                <div className="statistics__day__percent">
                    <CircularProgressbar value={correctPercentAudio} maxValue={100} text={`${correctPercentAudio}%`} strokeWidth={50}
                        styles={buildStyles({
                            textSize: '2.5em',
                            pathColor: `#68d4bb`,
                            textColor: 'white',
                            trailColor: '#fc7e53',
                            strokeLinecap: "butt"
                            // backgroundColor: '#3e98c7',
                        })} />
                    <p className="statistics__day__subscription">Правильных ответов</p>
                </div>
                <div>
                    <p className="statistics__day__subscription">{audioToday().newWords}</p>
                    <p className="statistics__day__subscription">Новых слов</p>
                </div>
                <div>
                    <p className="statistics__day__subscription">{audioToday().longestSeries}</p>
                    <p className="statistics__day__subscription">Самая длинная серия</p>
                </div>
                <div>
                    <p className="statistics__day__subscription">{audioToday().totalScore}</p>
                    <p className="statistics__day__subscription">Лучший балл</p>
                </div>
            </div>

        </div>
    );
}


export default DayStatistics;