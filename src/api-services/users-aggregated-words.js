import ApiErrorHandler from './api-error-handler';

class UsersAggregatedWords extends ApiErrorHandler {
  async getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter) {
    let params = '';
    if (group || page) {
      params = '?';
      if (group) {
        params += `group=${group}&`;
      }
      if (page) {
        params += `page=${page}&`;
      }
      if (wordsPerPage) {
        params += `wordsPerPage=${wordsPerPage}&`;
      }
      if (filter) {
        params += `filter=${filter}&`;
      }
      params = params.slice(0, params.length - 1);
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }
}

export default UsersAggregatedWords;
