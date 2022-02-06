import { words, WordFromCollection } from './words';
import { WORDS_MAX } from './const';
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
            answers.push(words[Math.floor(Math.random() * (WORDS_MAX + 1))].wordTranslate)
        }
    });
    return answers;
}

export const ShowEnglishWord = (props: {words: WordFromCollection[], wordNum: number}) => {
    return (
        <h4>
            {words[props.wordNum].word}
        </h4>
    )
}

export const ShowTranslate = (props: {answers: string}) => {
    return (
        <h4>
            {props.answers}
        </h4>
    )
}
