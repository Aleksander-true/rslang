import React from "react";
import { ShowEnglishWordPropsType } from "../../../Types/sprint";

const ShowEnglishWord: React.FC<ShowEnglishWordPropsType> = ({
  words,
  wordNum,
}) => {
  return (
    <>
      <h3 className="sprint__english-word">{words[wordNum]?.word}</h3>
      <h3> - </h3>
    </>
  );
};

export default ShowEnglishWord;
