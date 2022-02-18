import api from "../../API";
import { randomize, shuffledWords } from "./util";

export interface WordFromCollection {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

const getWords = async (group: string, page: string) => {
  let response: { isSuccess: boolean; data: any[] } = {
    isSuccess: false,
    data: [],
  };
  let currentResponse: { isSuccess: boolean; data: any };
  let thisPage: string;
  if (+page >= 0) {
    thisPage = page;
  } else {
    thisPage = randomize(0, 29).toString();
  }
  if (+page === 6) {
    currentResponse = (await api.getAllUserAggregatedWords(
      localStorage.getItem("userId")!,
      localStorage.getItem("token")!,
      group,
      thisPage,
      "20",
      JSON.stringify({ "userWord.difficulty": "hard" })
    ))!;
    if (currentResponse.isSuccess) {
      response.data = currentResponse.data;
      response.isSuccess = currentResponse.isSuccess;
    }
  } else
    do {
      currentResponse = (await api.getChunkOfWords(group, thisPage))!;
      if (currentResponse.isSuccess) {
        response.data = currentResponse.data;
        response.isSuccess = currentResponse.isSuccess;
      }
      if (localStorage.getItem("userId")) {
        const userWords = (await api.getAllUserAggregatedWords(
          localStorage.getItem("userId")!,
          localStorage.getItem("token")!,
          group,
          thisPage,
          "20",
          JSON.stringify({ "userWord.optional.isLearned": "true" })
        ))!;
        if (userWords.isSuccess) {
          for (let i = 0; i < userWords.data.length; i++) {
            for (let j = 0; j < response.data.length; j++) {
              if (response.data[j].id === userWords.data[i].id) {
                response.data.splice(j, 1);
              }
            }
          }
        }
      }
      if (+thisPage === 0) {
        break;
      }
      thisPage = (+thisPage - 1).toString();
    } while (response.data.length < 20);

  if (response.isSuccess) {
    return shuffledWords(response.data);
  } else {
    return;
  }
};

export default getWords;
