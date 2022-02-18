import { WordFromCollection } from "./WordsAPI";
import { WORDS_MAX } from "./const";

export const shuffledWords = (words: WordFromCollection[]) => {
  let arr = words.slice();
  arr.sort(() => Math.random() - 0.5);
  return arr;
};

export const randomize = (minNumber: number, maxNumber: number): number => {
  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

export const randomAnswer = (words: WordFromCollection[]) => {
  let answers: string[] = [];
  words.forEach((word) => {
    if (randomize(0, 1)) {
      answers.push(word.wordTranslate);
    } else {
      answers.push(words[randomize(0, WORDS_MAX)].wordTranslate);
    }
  });
  return answers;
};

export const formDate = (date: Date) => {
  return `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;
};
