import React from "react"
import { SOUND_ICON } from "../const";


const WordString = (props: { englishWord: string; russianWord: string; sound: string }) => {

    const englishWord = props.englishWord;
    const russianWord = props.russianWord;
    const soundURL = props.sound;

    return (
        <li>
            <a href={soundURL}>{SOUND_ICON} </a>
            {englishWord}
            -
            {russianWord} </li>
    )
}

export default WordString