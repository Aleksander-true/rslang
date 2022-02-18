import React from "react";
import { Statistic } from "../../../Types/api-tipes";
// import WordsLongStatistics from "./wordsLongStatistics";



type LongStatisticsPropsTypes = {
    statistics: Statistic;
  }  

const LongStatistics:React.FC<LongStatisticsPropsTypes> = (statistics) => {



  const wordsLongStatistics = JSON.stringify(  {
        id: "japan",
        color: "hsl(269, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 154
          },
          {
            x: "helicopter",
            y: 21
          },
          {
            x: "boat",
            y: 240
          }]})

    return (
        <>
{/* <WordsLongStatistics wordsLongStatistics={wordsLongStatistics} /> */}
        </>
    );
}


export default LongStatistics;


