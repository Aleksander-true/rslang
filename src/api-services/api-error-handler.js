import { BASE_URL } from "../constants";

class ApiErrorHandler {
  constructor() {
    this.BASE_URL = BASE_URL;
    this.SIGNIN = "/signin";
    this.USERS = "/users";
    this.WORDS = "/words";
    this.AGGREGATED_WORDS = "/aggregatedWords";
    this.STATISTICS = "/statistics";
    this.SETTINGS = "/settings";
    this.TOKENS = "/tokens";
  }

  async apiErrorHandler(path, options, counter) {
    let response = new Response();
    let i;
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
        i = counter;
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
            response = await this.apiErrorHandler(path, options, i);
          }
        } catch {
          response = await this.apiErrorHandler(path, options, i);
        }
        return response;
      default:
    }
  }
}

export default ApiErrorHandler;
