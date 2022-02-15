import React from "react"
import Button from "../../../Components/Button"
import SprintGame from "../SprintGame"


type ResultBtnPropsType = {
    level: number; 
    page: number; 
}

const ResultBtn:React.FC<ResultBtnPropsType> = ({ level, page }) => {

    return (
        <Button title='Играть с этими словами ещё' onClick={() => SprintGame(level, page)} type='success' classType='sprint__btns'/>
    )
}

export default ResultBtn