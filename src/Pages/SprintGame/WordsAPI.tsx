import api from '../../API';
import { randomize, shuffledWords } from './util'

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

const getWords = async (group: string, page?: string) => {
    let response: { isSuccess: boolean; data: any; } = {isSuccess: false, data:[] };
    let userWords: { isSuccess: boolean; data: any; }  = {isSuccess: false, data:[] };
    let currentResponse: { isSuccess: boolean; data: any; };
    if (page) {
        response = (await api.getChunkOfWords(group, page))!;
        // let thisPage = page;
        // do {
        //     currentResponse = (await api.getChunkOfWords(group, thisPage))!;
        //     if (currentResponse.isSuccess) {
        //         if (response) {
        //             response = response.data.push(currentResponse.data);
        //         }
        //         else response = currentResponse;
        //     }
        //     if (localStorage.getItem('userId')) {
        //         userWords = (await api.getAllUserAggregatedWords(localStorage.getItem('userId'), localStorage.getItem('token'), group, thisPage, { "$and": [{ "userWord.difficulty": "learned" }] }))!
        //         if (userWords.isSuccess) {
        //             for (let i = 0; i < userWords.data.length; i++) {
        //                 for (let j = 0; j < response.data.length; j++) {
        //                     if (response.data[j].id === userWords.data[i].id) {
        //                         response.data.splice(j, 1)
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     if (+thisPage === 0) { break }
        //     thisPage = (+thisPage - 1).toString();
        // } while (response.data.length < 20);
    }
    else {
        response = (await api.getChunkOfWords(group, randomize(0, 29)))!;
    }

    console.log(response);

    if (response.isSuccess) {
        return shuffledWords(await response.data);
    } else {
        return;
    }
}

export default getWords