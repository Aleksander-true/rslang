import { words, WordFromCollection } from './words';
import { SOUND_ICON, WORDS_MAX } from './const';
import React from 'react';


export const shuffledWords = () => {
    let arr = words.slice()
    arr.sort(() => Math.random() - 0.5)
    return arr
}

export const randomAnswer = (words: WordFromCollection[]) => {
    let answers: string[] = []
    words.forEach(word => {
        if (Math.round(Math.random())) {
            answers.push(word.wordTranslate)
        } else {
            answers.push(words[Math.floor(Math.random() * (WORDS_MAX+1))].wordTranslate)
        }
    });
    return answers;
}

export const showEnglishWord = (words: WordFromCollection[], wordNum: number) => {
    return (
        <div>
            {words[wordNum].word}
        </div>
    )
}

export const showTranslate = (translateAnswer: string) => {
    return (
        <div>
            {translateAnswer}
        </div>
    )
}

export const WordString = (props: { englishWord: string; russianWord: string; sound: string; id: string; }) => {

    const englishWord = props.englishWord;
    const russianWord = props.russianWord;
    const soundURL = props.sound;
    const id = props.id
    return (
        <li key={id}>
            <a href={soundURL}>{SOUND_ICON} </a>
            {englishWord}
            -
            {russianWord} </li>
    )
}

export const handleClick = (correctWords: WordFromCollection[], wrongWords: WordFromCollection[], userAnswer: boolean, realAnswer: boolean, count: number, setCount: React.Dispatch<React.SetStateAction<number>>, maxSeries: number, setMaxSeries: React.Dispatch<React.SetStateAction<number>>, words: WordFromCollection[], wordNum: number, setWordNum: React.Dispatch<React.SetStateAction<number>>) => {

    if (realAnswer === userAnswer) {
        setCount(count + 1);
        setMaxSeries(maxSeries + 1);
        correctWords.push(words[wordNum]);
    } else {
        setMaxSeries(maxSeries = 0)
        wrongWords.push(words[wordNum]);
    }
    if (wordNum<WORDS_MAX) {
    setWordNum(wordNum + 1);}

}


export const ShowButtons = (correctWords: WordFromCollection[], wrongWords: WordFromCollection[], words:WordFromCollection[], wordNum:number, setWordNum: React.Dispatch<React.SetStateAction<number>>, count:number, setCount: React.Dispatch<React.SetStateAction<number>>, maxSeries:number, setMaxSeries: React.Dispatch<React.SetStateAction<number>>, realAnswer:boolean) => {
    return (
      <div>
        <button className= "btn btn-danger" onClick={() => handleClick(correctWords, wrongWords, false, realAnswer, count, setCount, maxSeries, setMaxSeries, words, wordNum, setWordNum)}>Нет</button>
        <button className="btn btn-success" onClick={() => handleClick(correctWords, wrongWords, true, realAnswer, count, setCount, maxSeries, setMaxSeries, words, wordNum, setWordNum)}>Да</button>
      </div>
    )
  }