import React from "react"
import WordString from "./WordString"
import { WordFromCollection } from "../WordsAPI"
import cupImg from "../../../assets/svg/Cup.svg"

type ResultsPagePropsType = {
    correctWords: WordFromCollection[]; 
    wrongWords: WordFromCollection[];
    score: number; 
}

const ResultsPage:React.FC<ResultsPagePropsType> = ({ correctWords, wrongWords, score }) => {

    const correctWordsElements = correctWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={"v"} />
    )

    const wrongWordsElements = wrongWords.map(word =>
        <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={'x'} />
    )

    return (
        <div className="sprint__results">
            <div className="sprint__results__header">
                <h3 className='sprint__question-page__correct'>Верно: 
                    <p>{correctWords.length}</p></h3>
                    <h3 className='sprint__question-page__count'>{score}</h3>
                {/* <img src={cupImg} alt="Cup" className="sprint__results__header-img" /> */}

                <h3 className='sprint__question-page__false'>Ошибки: 
                    <p>{wrongWords.length}</p></h3>
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