import React, { Suspense, useEffect } from "react";
import usePromise from 'react-promise';
import Async from 'react-promise'
import { useState } from "react";
import getWords, { WordFromCollection } from "../WordsAPI";
import SprintGameStart from "./SprintStart";

const SprintGameInside = (props: { level: number }) => {

  const [innerLevel, setInnerLevel] = useState(-1);
  const [currentWords, setCurrentWords] = useState<WordFromCollection[]>([]);
  const [loaded, setLoaded] = useState(false);

  // const currentWords = getWords((props.level - 1).toString())!;

  // const promise: WordFromCollection[] = 
  //   getWords((props.level - 1).toString()) as unknown as WordFromCollection[];

  // promise.then(result => {
  //   setCurrentWords(shuffledWords(result));
  // }, function (error) {
  //   console.log(error);
  // });

  useEffect(() => {
    if (props.level !== innerLevel) {
      async function words() {
        setLoaded(false);
        const currentWords = await getWords((props.level - 1).toString());
        setCurrentWords(currentWords || []);
        setLoaded(true);
        setInnerLevel(props.level);
      }
      words();
    } else return
  }, [innerLevel]);

  // useEffect(() => {
  //   console.log('changed')
  //   if (currentWords.length !== 0) {
  //     setLoaded(true);
  //   }
  // }, [currentWords]);

  // const {currentWords, loading} = usePromise<WordFromCollection[]>(getWords((props.level - 1).toString()) as unknown as WordFromCollection[])
  // if (loading) return null

  // const answers: string[] = randomAnswer(currentWords) as string[];
  // const [timeLeft, setTimeLeft] = useState(TIMER_TIME);
  // const [correctWords, setCorrectWords] = useState<WordFromCollection[]>([]);
  // const [wrongWords, setWrongWords] = useState<WordFromCollection[]>([]);
  // const wordNum = correctWords.length + wrongWords.length;

  // console.log(currentWords);

  // return (
  //   <div className='sprint__question-page'>
  //     {(timeLeft === 0 || wordNum === WORDS_MAX) ? <ResultsPage correctWords={correctWords} wrongWords={wrongWords} /> : null}
  //     {(timeLeft > 0 && wordNum < WORDS_MAX) ? <> <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
  //     <Suspense fallback={<div>Loading Component</div>}>
  //     <SprintQuestions setCorrectWords={setCorrectWords} setWrongWords={setWrongWords} answers={answers} currentWords={currentWords} /> 
  //     </Suspense>
  //     </> : null}
  //   </div>
  // )

  return (
    <> {loaded && <SprintGameStart level={props.level} currentWords={currentWords} />}</>
    // <> {loaded && <div>{currentWords.length} </div>}</>
  )
}

export default SprintGameInside