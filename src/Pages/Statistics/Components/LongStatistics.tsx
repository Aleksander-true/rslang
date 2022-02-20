import React from "react";
import { Statistic } from "../../../Types/api-tipes";
import Chart from "./Chart";
import Line from "./Line";

type LongStatisticsPropsTypes = {
  statistics: Statistic;
};

const LongStatistics: React.FC<LongStatisticsPropsTypes> = (statistics) => {
  return (
    <>
      <Line />
      <Chart />
    </>
  );
};

export default LongStatistics;
