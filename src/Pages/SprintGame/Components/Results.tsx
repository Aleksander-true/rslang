import React from "react"
import WordString from "./WordString"
import { WordFromCollection } from "../words"

const ResultsPage = (props: { correctWords: WordFromCollection[]; wrongWords: WordFromCollection[] }) => {

    const correctWordsElements = props.correctWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={"v"}/>
    )

    const wrongWordsElements = props.wrongWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={'x'}/>
    )

    return (
        <div>
            <ul>
                
                {correctWordsElements}
                
                {wrongWordsElements}
            </ul>
        </div>
    )
}

export default ResultsPage