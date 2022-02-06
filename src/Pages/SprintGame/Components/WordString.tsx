import React from "react"
import { SOUND_ICON } from "../const";
import x from "../../../assets/svg/v.svg"
import v from "../../../assets/svg/x.svg"


const WordString = (props: { englishWord: string; russianWord: string; sound: string; type: 'v' | 'x' }) => {

    const englishWord = props.englishWord;
    const russianWord = props.russianWord;
    const soundURL = props.sound;
    const indicator = (props.type === 'v' ? x : v)

    return (
        <li>
            <img src={indicator} alt={props.type} className="sprint__results__indicator"/> 
            <a href={soundURL}>{SOUND_ICON} </a>
            {englishWord}
            -
            {russianWord} 
            </li>
    )
}

export default WordString