import ApiService from "./ApiService";
import TokenService from "./TokenService";
import User from "../views/User";

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {

  async login(email, password) {
    const requestData = {
      method: 'post',
      url: 'user/login',
      data: {
        email,
        password,
        grant_type: 'password',
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.token);
      ApiService.setHeader();

      return response.data.token;
    } catch ( e ) {
      throw new AuthenticationError(e.response.status, e.response.data.errors[0]);
    }
  },

  logout() {
    TokenService.removeToken();
    ApiService.removeHeader();
  }

};

export default UserService;

export { UserService, AuthenticationError };
