import React from "react"

const ShowTranslate = (props: {answers: string}) => {
    console.log(props.answers)
    return (
        <h3>
            {props.answers}
        </h3>
    )
}

export default ShowTranslate;