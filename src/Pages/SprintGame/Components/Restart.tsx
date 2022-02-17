import React from "react"
import Button from "../../../Components/Button"
import SprintGame from "../SprintGame"



const ResultBtn = () => {

    return (
        <Button title='Играть с этими словами ещё' onClick={() => SprintGame()} type='success' classType='sprint__btns'/>
    )
}

export default ResultBtn