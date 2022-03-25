import { BASE_URL } from '../constants';
import { APIOptions } from '../Types/api-tipes';

class ApiErrorHandler {
  BASE_URL: string;
  SIGNIN: string;
  USERS: string;
  WORDS: string;
  AGGREGATED_WORDS: string;
  STATISTICS: string;
  SETTINGS: string;
  TOKENS: string;

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

  async apiErrorHandler(path: string, options: APIOptions, counter?: number) {
    let response = new Response();
    let i: number;
    switch (Boolean(counter)) {
      case false:
        i = 0;
        break;
      default:
        switch (counter) {
          case 2:
            response = await fetch(path, options);
            return response;
          default:
        }
        i = counter as number;
    }
    switch (i < 2) {
      case true:
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(i++);
          }, 1000);
        });
        try {
          response = await fetch(path, options);
          if (response.status === 503) {
            response = (await this.apiErrorHandler(path, options, i)) as Response;
          }
        } catch {
          response = (await this.apiErrorHandler(path, options, i)) as Response;
        }
        return response;
      default:
    }
  }
}

export default ApiErrorHandler;
