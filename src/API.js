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
    let rawResponse;
    let result;
    try {
      rawResponse = await this.wordsMethods.getChunkOfWords(group, page);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getWordByID(id) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.wordsMethods.getWordByID(id);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async createNewUser(requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersMethods.createNewUser(requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getUser(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersMethods.getUser(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async updateUser(id, token, requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersMethods.updateUser(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async deleteUser(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersMethods.deleteUser(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getNewUserTokens(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersMethods.getNewUserTokens(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getAllUserWords(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersWordsMethods.getAllUserWords(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async createWord(id, wordID, token, requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersWordsMethods.createWord(id, wordID, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getWord(id, wordID, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersWordsMethods.getWord(id, wordID, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async updateWord(id, wordID, token, requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersWordsMethods.updateWord(id, wordID, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async deleteWord(id, wordID, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersWordsMethods.deleteWord(id, wordID, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersAggregatedWordsMethods.getAllUserAggregatedWords(id, token, group, page, wordsPerPage, filter);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getAggregatedWord(id, wordID, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersAggregatedWordsMethods.getAggregatedWord(id, wordID, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getStatistics(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersStatisticMethods.getStatistics(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async upsertStatistics(id, token, requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersStatisticMethods.upsertStatistics(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async getSettings(id, token) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersSettingMethods.getSettings(id, token);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async upsertSettings(id, token, requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.usersSettingMethods.upsertSettings(id, token, requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async signIn(requestBody) {
    let rawResponse;
    let result;
    try {
      rawResponse = await this.signInMethods.signIn(requestBody);
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      result = { isSuccess: false, errorMessage: `${e.name}: ${e.message}` };
    }
    return result;
  }

  async checkResponse(response) {
    const succesStatusDigit = '2';
    if (String(response.status)[0] !== succesStatusDigit) {
      return { isSuccess: false, errorMessage: `Error ${response.status}: ${response.statusText}` };
    } else {
      if (response.status === 204) {
        return { isSuccess: true, data: { message: response.statusText } };
      }
      const responseBody = await response.json();
      return { isSuccess: true, data: JSON.parse(responseBody) };
    }
  }
}

const api = new Api();

export default api;
