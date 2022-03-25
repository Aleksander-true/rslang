import React from "react";
import { SOUND_ICON } from "../const";
import x from "../../../assets/svg/v.svg";
import v from "../../../assets/svg/x.svg";
import { BASE_URL } from "../../../constants";

const WordString = (props: {
  englishWord: string;
  russianWord: string;
  sound: string;
  type: "v" | "x";
}) => {
  const englishWord = props.englishWord;
  const russianWord = props.russianWord;
  const soundURL = `${BASE_URL}/${props.sound}`;
  const indicator = props.type === "v" ? x : v;
  const audio = new Audio();
  audio.src = soundURL;

  return (
    <li>
      <img
        src={indicator}
        alt={props.type}
        className="sprint__results__indicator"
      />
      <i
        className="bi bi-volume-down-fill card__volume-icon"
        onClick={() => audio.play()}
      ></i>
      {englishWord}-{russianWord}
    </li>
  );
};

export default WordString;
