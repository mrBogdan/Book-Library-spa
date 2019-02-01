import TokenService from "../services/TokenService";

const UserStore = {
  state: {
    authenticating: false,
    token: TokenService.getToken(),
    user: {}
  },

  getters: {

  }
};

export default UserStore;

