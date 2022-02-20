import React from "react"


const WordsIKnow = (props: { learnedWords: number }) => {

    return (
        <div className="statistics__total-words">
            <p>Слов</p>  <p>изучено:</p>  <p>{props.learnedWords}</p> 
        </div>
    );
}


export default WordsIKnow;