import React from "react";
import { Statistic } from "../../../Types/api-tipes";
import Line from "./Chart";

type LongStatisticsPropsTypes = {
  statistics: Statistic;
};

const LongStatistics: React.FC<LongStatisticsPropsTypes> = (statistics) => {
  return (
    <>
      {/* <WordsLongStatistics wordsLongStatistics={wordsLongStatistics} /> */}
      <Line />
    </>
  );
};

export default LongStatistics;
