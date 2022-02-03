class ApiErrorHandler {
  constructor() {
    this.BASE_URL = 'https://rslang-app-team-9.herokuapp.com';
    this.SIGNIN = '/signin';
    this.USERS = '/users';
    this.WORDS = '/words';
    this.AGGREGATED_WORDS = '/aggregatedWords';
    this.STATISTICS = '/statistics';
    this.SETTINGS = '/settings';
    this.TOKENS = '/tokens';
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
          case 10:
            response = new Response(null, { status: 429, statusText: 'Too Many Requests' });
            return response;
          default:
        }
        i = counter;
    }
    switch (i < 10) {
      case true:
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(i++);
          }, 1000);
        });
        try {
          response = await fetch(path, options);
        } catch {
          response = await this.apiErrorHandler(path, options, i);
        }
        return response;
      default:
    }
  }
}

export default ApiErrorHandler;
