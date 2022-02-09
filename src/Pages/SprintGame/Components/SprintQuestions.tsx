import React from "react";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import { SprintQuestionsPropsType } from "../../../Types/sprint";
import { clickApiActions } from "../clickAPI";
import { WORDS_MAX } from "../const";
import ShowEnglishWord from "./ShowEnglishWord";
import ShowTranslate from "./ShowTranslate";


const SprintQuestions: React.FC<SprintQuestionsPropsType> = ({ setCorrectWords, setWrongWords, answers, currentWords }) => {
    const [wordNum, setWordNum] = useState(0)
    const [count, setCount] = useState(0);
    const [maxSeries, setMaxSeries] = useState(0)

    useEffect(() => {
        const keyPress = (event: { keyCode: number; }) => {
            if (wordNum > WORDS_MAX - 1) {
                return
            }
            if (event.keyCode === 39) { //right
                handleClick(true);
            }
            else if (event.keyCode === 37) {
                handleClick(false);
            }
        }
        window.addEventListener('keydown', keyPress);
        return () => {
            window.removeEventListener('keydown', keyPress);
        };
    }, [wordNum]);

    const handleClick = async (userAnswer: boolean) => {
        const realAnswer = (currentWords[wordNum].wordTranslate === answers[wordNum]);
        let answer: boolean;
       
        if (userAnswer === realAnswer) {
            setCount(prev => prev + 1);
            setMaxSeries(prev => prev + 1);
            setCorrectWords(prev => [...prev, currentWords[wordNum]])
            setWordNum(prev => prev + 1);
            answer = true;
        } else {
            setMaxSeries(0)
            setWrongWords(prev => [...prev, currentWords[wordNum]])
            setWordNum(prev => prev + 1);   
            answer = false;        
        }
       if(localStorage.getItem('userId')) {clickApiActions(answer, currentWords, wordNum, maxSeries)};
    }

    return (
        <div className='sprint__question-page'>
            <h3>Текущий результат: {count}</h3>
            <p>Угадано подряд: {maxSeries}</p>

            <div>
                <ShowEnglishWord words={currentWords} wordNum={wordNum} />
                <ShowTranslate answers={answers[wordNum]} />
                <Button title='no' onClick={() => handleClick(false)} type='danger' />
                <Button title='yes' onClick={() => handleClick(true)} type='success' />
            </div>
        </div>
    )
}

export default SprintQuestions;