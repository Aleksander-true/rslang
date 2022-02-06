import React from "react"
import WordString from "./WordString"
import { WordFromCollection } from "../words"

const ResultsPage = (props: { correctWords: WordFromCollection[]; wrongWords: WordFromCollection[] }) => {

    const correctWordsElements = props.correctWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} />
    )

    const wrongWordsElements = props.wrongWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} />
    )

    return (
        <div>
            <ul>
                <p>correct</p>
                {correctWordsElements}
                <p>wrong</p>
                {wrongWordsElements}
            </ul>
        </div>
    )
}

export default ResultsPage