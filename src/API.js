import SignIn from './api-services/sign-in';
import Users from './api-services/users';
import Words from './api-services/words';
import UsersWords from './api-services/users-words';
import UsersAggregatedWords from './api-services/users-aggregated-words';
import UsersStatistic from './api-services/users-statistic';
import UsersSetting from './api-services/users-setting';
class Api {
  constructor() {
    this.wordsMethods = new Words();
    this.usersMethods = new Users();
    this.usersWordsMethods = new UsersWords();
    this.usersAggregatedWordsMethods = new UsersAggregatedWords();
    this.usersStatisticMethods = new UsersStatistic();
    this.usersSettingMethods = new UsersSetting();
    this.signInMethods = new SignIn();
  }

  async getChunkOfWords(group, page) {
    let result;
    try {
      const rawResponse = await this.wordsMethods.getChunkOfWords(group, page);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getWordByID(id) {
    let result;
    try {
      const rawResponse = await this.wordsMethods.getWordByID(id);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async createNewUser(requestBody) {
    let result;
    try {
      const rawResponse = await this.usersMethods.createNewUser(requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getUser(id, token) {
    let result;
    try {
      const rawResponse = await this.usersMethods.getUser(id, token);
      result = await this.checkResponse(rawResponse, 'getUser');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async updateUser(id, token, requestBody) {
    let result;
    try {
      const rawResponse = await this.usersMethods.updateUser(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async deleteUser(id, token) {
    let result;
    try {
      const rawResponse = await this.usersMethods.deleteUser(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getNewUserTokens(id, token) {
    let result;
    try {
      const rawResponse = await this.usersMethods.getNewUserTokens(id, token);
      result = await this.checkResponse(rawResponse, 'getNewUserTokens');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getAllUserWords(id, token) {
    let result;
    try {
      const rawResponse = await this.usersWordsMethods.getAllUserWords(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async createWord(id, wordID, token, requestBody) {
    let result;
    try {
      const rawResponse = await this.usersWordsMethods.createWord(id, wordID, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getWord(id, wordID, token) {
    let result;
    try {
      const rawResponse = await this.usersWordsMethods.getWord(id, wordID, token);
      result = await this.checkResponse(rawResponse, 'getWord');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async updateWord(id, wordID, token, requestBody) {
    let result;
    try {
      const rawResponse = await this.usersWordsMethods.updateWord(id, wordID, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async deleteWord(id, wordID, token) {
    let result;
    try {
      const rawResponse = await this.usersWordsMethods.deleteWord(id, wordID, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter) {
    let result;
    try {
      const rawResponse = await this.usersAggregatedWordsMethods.getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getAggregatedWord(id, wordID, token) {
    let result;
    try {
      const rawResponse = await this.usersAggregatedWordsMethods.getAggregatedWord(id, wordID, token);
      result = await this.checkResponse(rawResponse, 'getAggregatedWord');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getStatistics(id, token) {
    let result;
    try {
      const rawResponse = await this.usersStatisticMethods.getStatistics(id, token);
      result = await this.checkResponse(rawResponse, 'getStatistics');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async upsertStatistics(id, token, requestBody) {
    let result;
    try {
      const rawResponse = await this.usersStatisticMethods.upsertStatistics(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async getSettings(id, token) {
    let result;
    try {
      const rawResponse = await this.usersSettingMethods.getSettings(id, token);
      result = await this.checkResponse(rawResponse, 'getSettings');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async upsertSettings(id, token, requestBody) {
    let result;
    try {
      const rawResponse = await this.usersSettingMethods.upsertSettings(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  async signIn(requestBody) {
    let result;
    try {
      const rawResponse = await this.signInMethods.signIn(requestBody);
      result = await this.checkResponse(rawResponse, 'signIn');
    } catch (e) {
      result = this.returnsErrorMessage(e);
    }
    return result;
  }

  returnsErrorMessage(error) {
    return { isSuccess: false, data: { errorMessage: `${error.name}: ${error.message}` } };
  }

  async checkResponse(response, method) {
    switch (response.status) {
      case 200:
        const responseBody = await response.json();
        return { isSuccess: true, data: responseBody };
      case 204:
        let message = "Don't panic. Everything is under control. Continue to work. Big brother is watching you.";
        return { isSuccess: true, data: { message: message } };
      case 400:
        return { isSuccess: false, data: { errorMessage: 'Bad request' } };
      case 401:
      case 402:
        return { isSuccess: false, data: { errorMessage: 'Access token is missing or invalid' } };
      case 403:
        switch (method) {
          case 'getNewUserTokens':
            return { isSuccess: false, data: { errorMessage: 'Access token is missing or invalid' } };
          case 'signIn':
            return { isSuccess: false, data: { errorMessage: 'Incorrect e-mail or password' } };
          default:
        }
        break;
      case 404:
        switch (method) {
          case 'getWord':
          case 'getAggregatedWord':
            return { isSuccess: false, data: { errorMessage: "User's word not found" } };
          case 'getUser':
            return { isSuccess: false, data: { errorMessage: 'User not found' } };
          case 'getStatistics':
            return { isSuccess: false, data: { errorMessage: 'Statistics not found' } };
          case 'getSettings':
            return { isSuccess: false, data: { errorMessage: 'Settings not found' } };
          default:
            return { isSuccess: false, data: { errorMessage: 'Not found' } };
        }
      case 422:
        return { isSuccess: false, data: { errorMessage: 'Incorrect e-mail or password' } };
      case 503:
        return { isSuccess: false, data: { errorMessage: 'Service unavailable' } };
      default:
        message = `Response code: ${response.status}. Unknown case: ${response.statusText}`;
        return { isSuccess: false, data: { errorMessage: message } };
    }
  }
}

const api = new Api();

export default api;
