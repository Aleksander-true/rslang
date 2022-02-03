import ApiErrorHandler from './api-error-handler';

class UsersAggregatedWords extends ApiErrorHandler {
  async getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter) {
    let params;
    if (group) {
      params = `?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`;
    } else {
      params = `?page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`;
    }
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.AGGREGATED_WORDS}${params}`;
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

  async getAggregatedWord(id, wordID, token) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.AGGREGATED_WORDS}/${wordID}`;
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
}

export default UsersAggregatedWords;
