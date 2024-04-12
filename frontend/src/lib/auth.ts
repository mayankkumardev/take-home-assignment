/* eslint-disable @typescript-eslint/no-extraneous-class */
const ACCESS_TOKEN = 'access_token';

/**
 * Please ensure that you use this Auth class on the client side,
 * as local storage is not accessible on the server side in Next.js.
 */
class Auth {
  static isClientSide = typeof window !== 'undefined';

  static get getToken() {
    if (Auth.isClientSide) {
      return localStorage.getItem(ACCESS_TOKEN);
    }

    return null;
  }

  static get isTokenValid() {
    return !!this.getToken;
  }

  static setToken(token: string) {
    if (Auth.isClientSide) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }

  static removeToken() {
    if (Auth.isClientSide) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }
}

export default Auth;
