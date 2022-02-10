import ApiErrorHandler from './api-error-handler';
import { UserWord } from '../types/api-tipes';

class UsersWords extends ApiErrorHandler {
  async getAllUserWords(id: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.WORDS}`;
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    let rawResponse;
    try {
      rawResponse = await fetch(path, options);
    } catch (e) {
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }

  async createWord(id: string, wordID: string, token: string, requestBody: UserWord) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.WORDS}/${wordID}`;
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };
    let rawResponse;
    try {
      rawResponse = await fetch(path, options);
    } catch (e) {
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }

  async getWord(id: string, wordID: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.WORDS}/${wordID}`;
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    let rawResponse;
    try {
      rawResponse = await fetch(path, options);
    } catch (e) {
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }

  async updateWord(id: string, wordID: string, token: string, requestBody: UserWord) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.WORDS}/${wordID}`;
    const options = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };
    let rawResponse;
    try {
      rawResponse = await fetch(path, options);
    } catch (e) {
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }

  async deleteWord(id: string, wordID: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.WORDS}/${wordID}`;
    const options = {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    let rawResponse;
    try {
      rawResponse = await fetch(path, options);
    } catch (e) {
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }
}

export default UsersWords;
