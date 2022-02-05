import { BASE_URL } from '../constants';

class ApiErrorHandler {
  constructor() {
    this.BASE_URL = BASE_URL;
    this.SIGNIN = '/signin';
    this.USERS = '/users';
    this.WORDS = '/words';
    this.AGGREGATED_WORDS = '/aggregatedWords';
    this.STATISTICS = '/statistics';
    this.SETTINGS = '/settings';
    this.TOKENS = '/tokens';
  }

  async apiErrorHandler(path, options, rawResponse, counter) {
    if (rawResponse.status !== 503) {
      return rawResponse;
    }
    let response = new Response();
    let i;
    switch (Boolean(counter)) {
      case false:
        i = 0;
        break;
      default:
        switch (counter) {
          case 3:
            return rawResponse;
          default:
        }
        i = counter;
    }
    switch (i < 3) {
      case true:
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(i++);
          }, 1000);
        });
        try {
          response = await fetch(path, options);
        } catch {
          response = await this.apiErrorHandler(path, options, response, i);
        }
        return response;
      default:
    }
  }
}

export default ApiErrorHandler;
