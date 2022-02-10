import ApiErrorHandler from './api-error-handler';
import { Setting } from '../types/api-tipes';

class UsersSetting extends ApiErrorHandler {
  async getSettings(id: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.SETTINGS}`;
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

  async upsertSettings(id: string, token: string, requestBody: Setting) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.SETTINGS}`;
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

export default UsersSetting;
