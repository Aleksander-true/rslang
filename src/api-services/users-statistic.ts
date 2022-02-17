import ApiErrorHandler from './api-error-handler';
import { Statistic } from '../Types/api-tipes';

class UsersStatistic extends ApiErrorHandler {
  async getStatistics(id: string, token: string) {
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

  async upsertStatistics(id: string, token: string, requestBody: Statistic) {
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
