import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLegend,
} from "victory";
import {
  OptionalStatistic,
  WordStatisticsType,
} from "../../../Types/api-tipes";
import { COLORS } from "../Constants";
import { formLineData } from "../StatisticsHelpers";

interface ChartDataItem {
  x: string;
  y: number;
}

type ChartData = ChartDataItem[];

type LinePropsType = {
  lineData: OptionalStatistic;
};

const Line: React.FC<LinePropsType> = ({ lineData }) => {
  const wordStatisticsKeys: string[] = Object.keys(lineData.wordStatistics);
  const myKey = wordStatisticsKeys[0];
  const dataIWant = Object.keys(lineData.wordStatistics[myKey]) as [
    keyof WordStatisticsType
  ];
  const [wining, setWining] = useState<ChartData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const data: ChartData[] = [];
    for (let i = 0; i < dataIWant.length; i++) {
      data.push(formLineData(lineData, dataIWant[i]));
    }
    const keys = Object.keys(lineData.wordStatistics);
    setCategories(keys);
    setWining(data);
  }, [lineData]);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLegend
        x={0}
        y={0}
        itemsPerRow={2}
        centerTitle
        orientation="vertical"
        gutter={20}
        data={[
          { name: "Верные ответы", symbol: { fill: COLORS.correctAnswers } },
          { name: "Выученные слова", symbol: { fill: COLORS.learnedWords } },
          { name: "Ошибки", symbol: { fill: COLORS.mistakes } },
          { name: "Новые слова", symbol: { fill: COLORS.newWords } },
        ]}
      />
      <VictoryLine
        categories={{
          x: categories,
        }}
        style={{
          data: { stroke: COLORS.correctAnswers },
          parent: { border: "1px solid #ccc" },
        }}
        data={wining[0]}
      />

      <VictoryLine
        categories={{
          x: categories,
        }}
        style={{
          data: { stroke: COLORS.learnedWords },
          parent: { border: "1px solid #ccc" },
        }}
        data={wining[1]}
      />
      <VictoryLine
        categories={{
          x: categories,
        }}
        style={{
          data: { stroke: COLORS.mistakes },
          parent: { border: "1px solid #ccc" },
        }}
        data={wining[2]}
      />
      <VictoryLine
        categories={{
          x: categories,
        }}
        style={{
          data: { stroke: COLORS.newWords },
          parent: { border: "1px solid #ccc" },
        }}
        data={wining[3]}
      />
    </VictoryChart>
  );
};

export default Line;
