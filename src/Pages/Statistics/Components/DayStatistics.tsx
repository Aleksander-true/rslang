import React from "react";
import { Statistic } from "../../../Types/api-tipes";
import formDate from "../formDate";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import book from "../../../assets/png/book.png";
import clock from "../../../assets/png/clock.png";
import phone from "../../../assets/png/phone.png";

type DayStatisticsPropsTypes = {
  statistics: Statistic;
};

const DayStatistics: React.FC<DayStatisticsPropsTypes> = (statistics) => {
  const date = new Date();
  const currentDate = formDate(date);

  const wordsToday = () => {
    if (!statistics.statistics.optional.wordStatistics[currentDate]) {
      return {
        correctAnswers: 0,
        mistakes: 0,
        newWords: 0,
        learnedWords: 0,
      };
    } else return statistics.statistics.optional.wordStatistics[currentDate];
  };
  const correctPercent =
    wordsToday().correctAnswers + wordsToday().mistakes
      ? Math.ceil(
          (100 * wordsToday().correctAnswers) /
            (wordsToday().correctAnswers + wordsToday().mistakes)
        )
      : 0;

  const sprintToday = () => {
    if (statistics.statistics.optional.sprint.lastChanged !== currentDate) {
      return {
        correctAnswers: 0,
        lastChanged: currentDate,
        newWords: 0,
        longestSeries: 0,
        wrongAnswers: 0,
        totalScore: 0,
      };
    } else return statistics.statistics.optional.sprint;
  };

  const correctPercentSprint =
    sprintToday().correctAnswers + sprintToday().wrongAnswers
      ? Math.ceil(
          (100 * sprintToday().correctAnswers) /
            (sprintToday().correctAnswers + sprintToday().wrongAnswers)
        )
      : 0;

  const audioToday = () => {
    if (statistics.statistics.optional.audio.lastChanged !== currentDate) {
      return {
        correctAnswers: 0,
        lastChanged: currentDate,
        newWords: 0,
        longestSeries: 0,
        wrongAnswers: 0,
        totalScore: 0,
      };
    } else return statistics.statistics.optional.audio;
  };

  const correctPercentAudio =
    audioToday().correctAnswers + audioToday().wrongAnswers
      ? Math.ceil(
          (100 * audioToday().correctAnswers) /
            (audioToday().correctAnswers + audioToday().wrongAnswers)
        )
      : 0;

  return (
    <div className="statistics__day">
      <div className="statistics__day__card">
        <p className="card__subscription">Данные по словам</p>
        <div className="statistics__day__words">
          <img src={book} alt="book" className="statistics__day__logo"></img>
          <div className="statistics__day__percent">
            <CircularProgressbar
              value={correctPercent}
              maxValue={100}
              text={`${correctPercent}%`}
              strokeWidth={50}
              styles={buildStyles({
                textSize: "2.5em",
                pathColor: `#68d4bb`,
                textColor: "white",
                trailColor: "#fc7e53",
                strokeLinecap: "butt",
              })}
            />
          </div>

          <div>
            <p className="statistics__day__number">{wordsToday().newWords}</p>
          </div>
          <div>
            <p className="statistics__day__number">
              {wordsToday().learnedWords}
            </p>
          </div>
          <div>
            <p className="statistics__day__subscription">Правильных ответов</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Новых слов</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Изучено слов</p>
          </div>
        </div>
      </div>

      <div className="statistics__day__card">
        <p className="card__subscription">Игра Спринт</p>
        <div className="statistics__day__sprint">
          <img src={clock} alt="clock" className="statistics__day__logo"></img>
          <div className="statistics__day__percent">
            <CircularProgressbar
              value={correctPercentSprint}
              maxValue={100}
              text={`${correctPercentSprint}%`}
              strokeWidth={50}
              styles={buildStyles({
                textSize: "2.5em",
                pathColor: `#68d4bb`,
                textColor: "white",
                trailColor: "#fc7e53",
                strokeLinecap: "butt",
              })}
            />
          </div>
          <div>
            <p className="statistics__day__number">{sprintToday().newWords}</p>
          </div>
          <div>
            <p className="statistics__day__number">
              {sprintToday().longestSeries}
            </p>
          </div>
          <div>
            <p className="statistics__day__number">
              {sprintToday().totalScore}
            </p>
          </div>
          <div>
            <p className="statistics__day__subscription">Правильных ответов</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Новых слов</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Самая длинная серия</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Лучший балл</p>
          </div>
        </div>
      </div>

      <div className="statistics__day__card">
        <p className="card__subscription">Игра Аудиовызов</p>
        <div className="statistics__day__audio">
          <img src={phone} alt="phone" className="statistics__day__logo"></img>
          <div className="statistics__day__percent">
            <CircularProgressbar
              value={correctPercentAudio}
              maxValue={100}
              text={`${correctPercentAudio}%`}
              strokeWidth={50}
              styles={buildStyles({
                textSize: "2.5em",
                pathColor: `#68d4bb`,
                textColor: "white",
                trailColor: "#fc7e53",
                strokeLinecap: "butt",
              })}
            />
          </div>

          <div>
            <p className="statistics__day__number">{audioToday().newWords}</p>
          </div>
          <div>
            <p className="statistics__day__number">
              {audioToday().longestSeries}
            </p>
          </div>
          <div>
            <p className="statistics__day__number">{audioToday().totalScore}</p>
          </div>
          <div>
            <p className="statistics__day__subscription">Правильных ответов</p>
          </div>

          <div>
            <p className="statistics__day__subscription">Новых слов</p>
          </div>

          <div>
            <p className="statistics__day__subscription">Самая длинная серия</p>
          </div>

          <div>
            <p className="statistics__day__subscription">Лучший балл</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayStatistics;
