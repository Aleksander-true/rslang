import ApiErrorHandler from './api-error-handler';

class UsersAggregatedWords extends ApiErrorHandler {
  async getAllUserAggregatedWords(
    id: string,
    token: string,
    group?: string,
    page?: string,
    wordsPerPage?: string,
    filter?: string
  ) {
    let params = '';
    if (group || page || wordsPerPage || filter) {
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
      rawResponse = await this.apiErrorHandler(path, options);
    }
    return rawResponse;
  }

  async getAggregatedWord(id: string, wordID: string, token: string) {
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
