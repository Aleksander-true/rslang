import { OptionalStatistic, WordStatisticsType } from "../../Types/api-tipes";

export const formLineData = (
  statistics: OptionalStatistic,
  typeOfData: keyof WordStatisticsType
) => {
  const myLineData = [];
  const keys = Object.keys(statistics.wordStatistics);
  for (let i = 0; i < keys.length; i++) {
    myLineData.push({
      x: keys[i],
      y: statistics.wordStatistics[keys[i]][typeOfData],
    });
  }
  return myLineData;
};

export const formSumData = (statistics: OptionalStatistic) => {
  const myLineData = [];
  let sumWords = 0;
  const keys = Object.keys(statistics.wordStatistics);
  for (let i = 0; i < keys.length; i++) {
    sumWords += statistics.wordStatistics[keys[i]].learnedWords;
    myLineData.push({
      x: keys[i],
      y: sumWords,
    });
  }
  console.log(myLineData);
  return myLineData;
};
