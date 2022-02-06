import ApiErrorHandler from './api-error-handler';

class Words extends ApiErrorHandler {
  async getChunkOfWords(group, page) {
    let params = '';
    if (group || page) {
      params = '?';
      if (group) {
        params += `group=${group}&`;
      }
      if (page) {
        params += `page=${page}&`;
      }
      params = params.slice(0, params.length - 1);
    }
    const path = `${this.BASE_URL}${this.WORDS}${params}`;
    const options = {
      method: 'GET',
      headers: {
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

  async getWordByID(id) {
    const path = `${this.BASE_URL}${this.WORDS}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export default Words;
