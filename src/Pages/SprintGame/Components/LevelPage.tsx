import React from "react"
import { LevelChoice } from "./LevelChoice";

const LevelPage = (props: {level:null|number, setLevel:(value: number) => void}) => {
    const iconSize = '30';
    return (
      <div>
        <p>У тебя 30 секунд, попробуй угадать как можно больше слов</p>
        <p>Выбери уровень сложности чтобы начать</p>
        <div>
  
          <div onClick={() => { props.setLevel(1); }}><LevelChoice color="AAF3E2" size={iconSize} /> <p>A1</p></div>
          <div onClick={() => { props.setLevel(2); }}><LevelChoice color="68D4BB" size={iconSize} /> <p>A2</p></div>
          <div onClick={() => { props.setLevel(3); }}><LevelChoice color="FCE74E" size={iconSize} /> <p>B1</p></div>
          <div onClick={() => { props.setLevel(4); }}><LevelChoice color="FFBA4A" size={iconSize} /> <p>B2</p></div>
          <div onClick={() => { props.setLevel(5); }}><LevelChoice color="FFB197" size={iconSize} /> <p>C1</p></div>
          <div onClick={() => { props.setLevel(6); }}><LevelChoice color="FC7E53" size={iconSize} /> <p>C2</p></div>
        </div>
      </div>
    )
  }

  export default LevelPage