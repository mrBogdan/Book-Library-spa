import TokenService from "../services/TokenService";
import UserService from "../services/User.service";

const Store = {
  state: {
    auth: false,
    accessToken: TokenService.getToken(),
    user: {},
    userBooks: {},
  },

  getters: {
    loggedIn: (state) => {
      return !!state.accessToken;
    },

    getUser: (state) => {
      return state.user;
    },

    getBooks(state) {
      return state.userBooks
    }
  },

  actions: {
    logout ({ commit }) {
      UserService.logout();
      commit('logoutSuccess');
    }
  },

  mutations: {
    logoutSuccess (state, accessToken) {
      state.auth = false;
      state.user = {};
      state.accessToken = accessToken;
    },

    setUser (state, user) {
      state.user = user;
    },

    setBooks (state, books) {
      state.userBooks = books;
    },

    setAuth (state, auth) {
      state.auth = auth;
    }
  }
};

export default Store;

