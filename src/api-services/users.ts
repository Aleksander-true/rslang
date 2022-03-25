import ApiErrorHandler from './api-error-handler';
import { User, UpdateUser } from '../Types/api-tipes';

class Users extends ApiErrorHandler {
  async createNewUser(requestBody: User) {
    const path = `${this.BASE_URL}${this.USERS}`;
    const options = {
      method: 'POST',
      headers: {
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

  async getUser(id: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}`;
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

  async updateUser(id: string, token: string, requestBody: UpdateUser) {
    const path = `${this.BASE_URL}${this.USERS}/${id}`;
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

  async deleteUser(id: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}`;
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

  async getNewUserTokens(id: string, token: string) {
    const path = `${this.BASE_URL}${this.USERS}/${id}${this.TOKENS}`;
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

export default Users;
