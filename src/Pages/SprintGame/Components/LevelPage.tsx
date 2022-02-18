import React from "react"
import { LevelChoice } from "./LevelChoice";

const LevelPage = (props: { setLevel: (value: number) => void }) => {
  const iconSize = '50';
  return (
    <div className="sprint__levels">
      <h2 className="sprint__title">Спринт</h2>
      <h4>У тебя 30 секунд, попробуй угадать как можно больше слов</h4>
      <h4>Выбери уровень сложности чтобы начать</h4>
      <div className="sprint__levels-options">

        <div className="sprint__levels__level" onClick={() => { props.setLevel(1); }}><LevelChoice color="#AAF3E2" size={iconSize} /> <p className="sprint__levels__name">A1</p></div>
        <div className="sprint__levels__level" onClick={() => { props.setLevel(2); }}><LevelChoice color="#68D4BB" size={iconSize} /> <p className="sprint__levels__name">A1+</p></div>
        <div className="sprint__levels__level" onClick={() => { props.setLevel(3); }}><LevelChoice color="#FCE74E" size={iconSize} /> <p className="sprint__levels__name">A2</p></div>
        <div className="sprint__levels__level" onClick={() => { props.setLevel(4); }}><LevelChoice color="#FFBA4A" size={iconSize} /> <p className="sprint__levels__name">B1</p></div>
        <div className="sprint__levels__level" onClick={() => { props.setLevel(5); }}><LevelChoice color="#FFB197" size={iconSize} /> <p className="sprint__levels__name">B2</p></div>
        <div className="sprint__levels__level" onClick={() => { props.setLevel(6); }}><LevelChoice color="#FC7E53" size={iconSize} /> <p className="sprint__levels__name">C1</p></div>
      </div>
      <p>Выбирай правильный ответ стрелками на клавиатуре, чтобы успеть ещё больше</p>
    </div>
  )
}

export default LevelPage