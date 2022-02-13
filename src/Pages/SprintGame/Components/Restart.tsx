import React from "react"
import Button from "../../../Components/Button"
import SprintGame from "../SprintGame"


type ResultBtnPropsType = {
    level: number; 
    page: number; 
}

const ResultBtn:React.FC<ResultBtnPropsType> = ({ level, page }) => {

    // const correctWordsElements = correctWords.map(word =>
    //     <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={"v"} />
    // )

    // const wrongWordsElements = wrongWords.map(word =>
    //     <WordString englishWord={word.word} russianWord={word.wordTranslate} sound={word.audio} key={word.id} type={'x'} />
    // )

    return (
        <Button title='Играть с этими словами ещё' onClick={() => SprintGame(level, page)} type='success' classType='sprint__btns'/>
       
    )
}

export default ResultBtn