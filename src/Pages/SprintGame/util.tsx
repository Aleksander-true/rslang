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
