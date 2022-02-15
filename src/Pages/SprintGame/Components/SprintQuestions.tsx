import React from "react";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import { SprintQuestionsPropsType } from "../../../Types/sprint";
import { clickApiActions } from "../clickAPI";
import { TIMER_TIME, WORDS_MAX } from "../const";
import CountDownTimer from "./CountDownTimer";
import ShowEnglishWord from "./ShowEnglishWord";
import ShowTranslate from "./ShowTranslate";
import Stars from "./Stars";
import correctSound from "../../../assets/audio/correct.mp3"
import wrongSound from "../../../assets/audio/wrong.mp3"


const SprintQuestions: React.FC<SprintQuestionsPropsType> = ({ setCorrectWords, setWrongWords, answers, currentWords, setIsDone, score, setScore }) => {
    const [wordNum, setWordNum] = useState(0)
    const [maxSeries, setMaxSeries] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [stars, setStars] = useState(<></>)

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
        const audio = new Audio();
        

        if (userAnswer === realAnswer) {
           
            setMaxSeries(prev => prev + 1);
            setCorrectWords(prev => [...prev, currentWords[wordNum]])
            setWordNum(prev => prev + 1);
            setScore(prev => prev + 10*multiplier)
            answer = true;
            audio.src = correctSound;
            audio.play()
            console.log(userAnswer, realAnswer, answer)

        } else {
            setMaxSeries(0)
            setWrongWords(prev => [...prev, currentWords[wordNum]])
            setWordNum(prev => prev + 1);
            answer = false;
            audio.src = wrongSound;
            audio.play()
            console.log(userAnswer, realAnswer, answer)
        }
        if (localStorage.getItem('userId')) { clickApiActions(answer, currentWords, wordNum, maxSeries, score) };
    }

    useEffect(() => {
        if (maxSeries < 3) {
            setStars(<></>);
            setMultiplier(1);
        } else if (maxSeries < 6) {
            setStars(<Stars />)
            setMultiplier(2);
        } else if (maxSeries < 9) {
            setStars(<><Stars /><Stars /></>)
            setMultiplier(3);
        }
        else if (maxSeries < 12) {
            setStars(<><Stars /><Stars /><Stars /></>)
            setMultiplier(4)
        }
        else if (maxSeries < 16) {
            setStars(<><Stars /><Stars /><Stars /><Stars /></>)
            setMultiplier(5)
        }
        else {
            setStars(<><Stars /><Stars /><Stars /><Stars /><Stars /></>)
            setMultiplier(6)
        }
    
      }, [maxSeries])
    
   
return (
    <div className='sprint__question-page'>
        <div className='sprint__question-page__header'>
            <h3 className='sprint__question-page__count'>{score}</h3>
            <div className="sprint__star">{stars}</div>
            <div className="sprint__timer"> <CountDownTimer initialValue={TIMER_TIME} setIsDone={setIsDone} />
            </div>
        </div>
        <div className='sprint__question-page__words'>
            <ShowEnglishWord words={currentWords} wordNum={wordNum} />
            <ShowTranslate answers={answers[wordNum]} />
            <div>
            <Button title='Неверно' onClick={() => handleClick(false)} type='danger' classType='sprint__btns' />
            <Button title='Верно' onClick={() => handleClick(true)} type='success' classType='sprint__btns' />
            </div>
        </div>
    </div>
)
}

export default SprintQuestions;