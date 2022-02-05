import ApiErrorHandler from './api-error-handler';

class UsersStatistic extends ApiErrorHandler {
  async getStatistics(id, token) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.STATISTICS}`;
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

  async upsertStatistics(id, token, requestBody) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.STATISTICS}`;
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
}

export default UsersStatistic;
