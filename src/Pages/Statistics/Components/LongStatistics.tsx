import React from "react";
import { Statistic } from "../../../Types/api-tipes";
import Chart from "./Chart";
import Line from "./Line";

type LongStatisticsPropsTypes = {
  statistics: Statistic;
};

const LongStatistics: React.FC<LongStatisticsPropsTypes> = (statistics) => {
  return (
    <div className="statistics__long">
      <Line lineData={statistics.statistics.optional} />
      <Chart lineData={statistics.statistics.optional} />
    </div>
  );
};

export default LongStatistics;
