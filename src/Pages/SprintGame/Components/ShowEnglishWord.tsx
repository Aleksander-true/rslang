import React from "react"
import { ShowEnglishWordPropsType } from "../../../Types/sprint"

const ShowEnglishWord:React.FC<ShowEnglishWordPropsType> = ({words, wordNum}) => {
    return (
        <h4>
            {words[wordNum]?.word}
        </h4>
    )
}

export default ShowEnglishWord
