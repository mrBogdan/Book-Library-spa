import ApiService from "./ApiService";
import TokenService from "./TokenService";

const USER_ID_KEY = 'USER_ID_KEY';

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {

  async login (email, password) {
    const bodyFormData = new FormData();
    bodyFormData.set('email', email);
    bodyFormData.set('password', password);

    const requestData = {
      method: 'POST',
      url: 'user/login',
      data: bodyFormData
    };

    try {
      const response = await ApiService.customRequest(requestData);
      TokenService.saveToken(response.data.data.token);
      ApiService.setHeader();

      return response.data.data;
    } catch ( e ) {
      throw new AuthenticationError(401, 'Authentication error');
    }
  },

  logout () {
    TokenService.removeToken();
    ApiService.removeHeader();
  },

  saveUserId(id) {
    localStorage.setItem(USER_ID_KEY, id);
  },

  removeUserId() {
    localStorage.removeItem(USER_ID_KEY);
  },

  getUserId() {
    return localStorage.getItem(USER_ID_KEY);
  },

  getUserById(id) {
    const token = TokenService.getToken();

    return ApiService.get(`http://localhost:80/user/${id}`, {
      headers: { 'Authorization': `Basic ${token}` }
    });
  }

};

export default UserService;

export { UserService, AuthenticationError };
