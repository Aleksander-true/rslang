import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLegend } from "victory";
import { OptionalStatistic } from "../../../Types/api-tipes";
import { COLORS } from "../Constants";
import { formSumData } from "../StatisticsHelpers";

interface ChartDataItem {
  x: string;
  y: number;
}

type ChartData = ChartDataItem[];

type LinePropsType = {
  lineData: OptionalStatistic;
};

const Chart: React.FC<LinePropsType> = ({ lineData }) => {
  const [wining, setWining] = useState<ChartData>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const data: ChartData = formSumData(lineData);
    const keys = Object.keys(lineData.wordStatistics);
    setCategories(keys);
    setWining(data);
  }, [lineData]);

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryLegend
        x={0}
        y={0}
        itemsPerRow={2}
        centerTitle
        orientation="vertical"
        gutter={20}
        data={[
          {
            name: "Прогресс по выученным словам",
            symbol: { fill: COLORS.learnedWords },
          },
        ]}
      />
      <VictoryBar
        style={{ data: { fill: COLORS.learnedWords } }}
        categories={{
          x: categories,
        }}
        data={wining}
      />
    </VictoryChart>
  );
};

export default Chart;
