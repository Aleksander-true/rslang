import React from "react"
import WordString from "./WordString"
import { WordFromCollection } from "../words"
import cupImg from "../../../assets/svg/Cup.svg"

const ResultsPage = (props: { correctWords: WordFromCollection[]; wrongWords: WordFromCollection[] }) => {

    const correctWordsElements = props.correctWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={"v"} />
    )

    const wrongWordsElements = props.wrongWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={'x'} />
    )

    return (
        <div className="sprint__results">
            <div className="sprint__results__header">
                <h3>Верно: 
                    <p>{props.correctWords.length}</p></h3>
                <img src={cupImg} alt="Cup" className="sprint__results__header-img" />
                <h3>Ошибки: 
                    <p>{props.wrongWords.length}</p></h3>
            </div>

            <ul className="sprint__results-list">
                {correctWordsElements}
            </ul>
            <hr/>

            <ul className="sprint__results-list">
                {wrongWordsElements}
            </ul>
        </div>
    )
}

export default ResultsPage