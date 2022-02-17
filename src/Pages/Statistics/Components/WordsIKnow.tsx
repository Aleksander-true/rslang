import React from "react"


const WordsIKnow = (props: { learnedWords: number }) => {

    return (
        <div>
            {props.learnedWords}
        </div>
    );
}


export default WordsIKnow;