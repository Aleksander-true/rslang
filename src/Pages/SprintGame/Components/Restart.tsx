import React from "react"
import { Link } from "react-router-dom"
import Button from "../../../Components/Button"
import SprintGame from "../SprintGame"



const ResultBtn = () => {

    return (
       <Link to="/sprintGame"> <div className='sprint__btns'>Играть с этими словами ещё </div> </Link>
    )
}

export default ResultBtn