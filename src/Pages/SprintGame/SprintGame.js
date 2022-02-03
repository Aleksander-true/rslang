import React, { useState }  from 'react';
import { words } from './words';

const WORDS_MAX = 20;

// class SprintGame extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {text: "SprintGame"};
//   }

//   componentDidMount() {
//   }

//   componentWillUnmount() {
//   }

//   render() {
//     return (
//         <h1>{this.state.text}</h1>
//     );
//   }
// }

const SprintGame = () => {
  return (
    <div>
    {SprintButtons()}
    {SprintStructure(words)}
    </div>
  )
}

const SprintButtons = () => {
  return (
    <div>
    <button>Закрыть</button>
    <button>Полный экран</button>
    <button>Выключить звуки</button>
    </div>
  )
}

const SprintStructure = (words) => {
  const [count, setCount] = useState(0);
  const [maxSeries, setMaxSeries] = useState()
  const [wordNum, setWordNum] = useState()
  const translateAnswer = randomAnswer(words, wordNum)

  return (
  <div>
    <h3>Текущий результат {count}</h3>
    <div>
      {showTimer()}
      {showEnglishWord(words)}
      {showTranslate(translateAnswer)}
  const [maxSeries, setMaxSeries] = useState()
      {ShowButtons(words, wordNum, translateAnswer, setWordNum, count, setCount, maxSeries, setMaxSeries)}
    </div>
  </div>
  )
}

const showTimer = () => {

}

const showEnglishWord = (words, wordNum) => {
return (
<div>
  {words[wordNum].word}
  </div>
)
}

const showTranslate = (translateAnswer) => {
  
  return (
    <div>
      {translateAnswer}
      </div>
    )
  
}

const ShowButtons = (words, wordNum, translateAnswer, setWordNum, count, setCount, maxSeries, setMaxSeries) => {
  const userAnswer = (words[wordNum].translateAnswer === translateAnswer);
  
  const handleClick = (realAnswer) => {
    console.log('click');
    setWordNum(words + 1);

    if (realAnswer === userAnswer) {
      setCount(count+1);
      setMaxSeries(maxSeries+1);
    } else {
      setMaxSeries(maxSeries=0)
    }
  }

  return (
    <div>
      <button onClick={() => handleClick(false)}>Нет</button>
      <button onClick={() => handleClick(true)}>Да</button>
    </div>
  )
}

const randomAnswer = (words, wordNum) => {
 if (Math.random) {
  return (words[wordNum].wordTranslate)
 } else {
  return (words[Math.floor(Math.random*WORDS_MAX)])
 }
}


export default SprintGame;