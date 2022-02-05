import ApiErrorHandler from './api-error-handler';

class UsersWords extends ApiErrorHandler {
  async getAllUserWords(id, token) {
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }

  async createWord(id, wordID, token, requestBody) {
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }

  async getWord(id, wordID, token) {
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }

  async updateWord(id, wordID, token, requestBody) {
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }

  async deleteWord(id, wordID, token) {
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }
}

export default UsersWords;
