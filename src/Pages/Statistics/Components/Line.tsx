import React from "react";
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from "victory";

const data = [
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 },
];

const Line = () => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={data}
      />
    </VictoryChart>
  );
};

export default Line;
