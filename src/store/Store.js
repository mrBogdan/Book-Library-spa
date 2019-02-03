import TokenService from "../services/TokenService";
import UserService from "../services/User.service";

const userId = UserService.getUserId() || false;

console.log('ID => ', userId);

const Store = {
  state: {
    auth: false,
    accessToken: TokenService.getToken(),
    user: userId ? UserService.getUserById(userId).then((res) => {
      console.log('USER STORE => ', res.data);
      Store.state.user = res.data.data;
      Store.state.auth = true;
    }) : {}
  },

  getters: {
    loggedIn: (state) => {
      return !!state.accessToken;
    },

    getUser: (state) => {
      return state.user;
    }
  },

  actions: {
    logout ({ commit }) {
      UserService.logout();
      commit('logoutSuccess');
    }
  },

  mutations: {
    logoutSuccess(state, accessToken) {
      state.auth = false;
      state.user = {};
      state.accessToken = accessToken;
    },

    setUser(state, user) {
      state.user = user;
    }
  }
};

export default Store;

