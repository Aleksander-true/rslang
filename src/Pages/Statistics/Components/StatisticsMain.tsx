import React, { useEffect, useState } from "react";
import { Statistic } from "../../../Types/api-tipes";
import getAllLearned from "../getAllLearned";
import getStatistics from "../getStatistics";
import DayStatistics from "./DayStatistics";
import LongStatistics from "./LongStatistics";
import setStatistics from "./SetStatistics";
import WordsIKnow from "./WordsIKnow";

type StatisticsMainPropsTypes = {
    userID: string;
  }  

const StatisticsMain:React.FC<StatisticsMainPropsTypes> = ({userID}) => {
    const date = new Date()
    const statistics = setStatistics(date)

    const [currentStatistics, setCurrentStatistics] = useState<Statistic>(statistics);
    const [learnedWords, setLearnedWords] = useState(0);
  
    const loadStatistics = async (userID: string) => {
      const myWords = await getAllLearned(userID)!;
        const myStat = await getStatistics(userID);
        setCurrentStatistics(myStat || statistics);
        setLearnedWords(myWords || 0);
    }
  
    useEffect(() => {
      if (userID) {
        loadStatistics(userID);
      }
    }, [userID])


    return (
        <>
            <WordsIKnow learnedWords={learnedWords}/>
            <h3 className="statistics__subtitle"> Прогресс сегодня </h3>
            <DayStatistics statistics={currentStatistics}/>
            <h3 className="statistics__subtitle"> Мои результаты </h3>
            <LongStatistics statistics={currentStatistics}/>
        </>
    );
}


export default StatisticsMain;
