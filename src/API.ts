import SignIn from './api-services/sign-in';
import Users from './api-services/users';
import Words from './api-services/words';
import UsersWords from './api-services/users-words';
import UsersAggregatedWords from './api-services/users-aggregated-words';
import UsersStatistic from './api-services/users-statistic';
import UsersSetting from './api-services/users-setting';
import { User, UpdateUser, UserWord, Statistic, Setting, Auth } from './Types/api-tipes';

class Api {
  wordsMethods: Words;
  usersMethods: Users;
  usersWordsMethods: UsersWords;
  usersAggregatedWordsMethods: UsersAggregatedWords;
  usersStatisticMethods: UsersStatistic;
  usersSettingMethods: UsersSetting;
  signInMethods: SignIn;

  constructor() {
    this.wordsMethods = new Words();
    this.usersMethods = new Users();
    this.usersWordsMethods = new UsersWords();
    this.usersAggregatedWordsMethods = new UsersAggregatedWords();
    this.usersStatisticMethods = new UsersStatistic();
    this.usersSettingMethods = new UsersSetting();
    this.signInMethods = new SignIn();
  }

  async getChunkOfWords(group: string, page: string) {
    let result;
    try {
      const rawResponse = (await this.wordsMethods.getChunkOfWords(group, page)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getWordByID(id: string) {
    let result;
    try {
      const rawResponse = (await this.wordsMethods.getWordByID(id)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async createNewUser(requestBody: User) {
    let result;
    try {
      const rawResponse = (await this.usersMethods.createNewUser(requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getUser(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersMethods.getUser(id, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getUser');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async updateUser(id: string, token: string, requestBody: UpdateUser) {
    let result;
    try {
      const rawResponse = (await this.usersMethods.updateUser(id, token, requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async deleteUser(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersMethods.deleteUser(id, token)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getNewUserTokens(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersMethods.getNewUserTokens(id, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getNewUserTokens');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getAllUserWords(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersWordsMethods.getAllUserWords(id, token)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async createWord(id: string, wordID: string, token: string, requestBody: UserWord) {
    let result;
    try {
      const rawResponse = (await this.usersWordsMethods.createWord(id, wordID, token, requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getWord(id: string, wordID: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersWordsMethods.getWord(id, wordID, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getWord');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async updateWord(id: string, wordID: string, token: string, requestBody: Partial<UserWord>) {
    let result;
    try {
      const rawResponse = (await this.usersWordsMethods.updateWord(id, wordID, token, requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async deleteWord(id: string, wordID: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersWordsMethods.deleteWord(id, wordID, token)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getAllUserAggregatedWords(
    id: string,
    token: string,
    group?: string,
    page?: string,
    wordsPerPage?: string,
    filter?: string,
  ) {
    let result;
    try {
      const rawResponse = (await this.usersAggregatedWordsMethods.getAllUserAggregatedWords(
        id,
        token,
        group,
        page,
        wordsPerPage,
        filter,
      )) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getAggregatedWord(id: string, wordID: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersAggregatedWordsMethods.getAggregatedWord(id, wordID, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getAggregatedWord');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getStatistics(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersStatisticMethods.getStatistics(id, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getStatistics');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async upsertStatistics(id: string, token: string, requestBody: Statistic) {
    let result;
    try {
      const rawResponse = (await this.usersStatisticMethods.upsertStatistics(id, token, requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async getSettings(id: string, token: string) {
    let result;
    try {
      const rawResponse = (await this.usersSettingMethods.getSettings(id, token)) as Response;
      result = await this.checkResponse(rawResponse, 'getSettings');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async upsertSettings(id: string, token: string, requestBody: Setting) {
    let result;
    try {
      const rawResponse = (await this.usersSettingMethods.upsertSettings(id, token, requestBody)) as Response;
      result = await this.checkResponse(rawResponse);
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  async signIn(requestBody: UpdateUser) {
    let result;
    try {
      const rawResponse = (await this.signInMethods.signIn(requestBody)) as Response;
      result = await this.checkResponse(rawResponse, 'signIn');
    } catch (e) {
      if (e instanceof Error) {
        result = this.returnsErrorMessage(e);
      }
    }
    return result;
  }

  returnsErrorMessage(error: Error) {
    return { isSuccess: false, data: { errorMessage: `${error.name}: ${error.message}` } };
  }

  async checkResponse(response: Response, method?: string) {
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
      case 417:
        return { isSuccess: false, data: { errorMessage: 'User with this e-mail exists' } };
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
