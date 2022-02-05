import ApiErrorHandler from './api-error-handler';

class SignIn extends ApiErrorHandler {
  async signIn(requestBody) {
    const path = `${this.BASE_URL}${this.SIGNIN}`;
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
      rawResponse = await this.apiErrorHandler(path, options, rawResponse);
    }
    return rawResponse;
  }
}

export default SignIn;
