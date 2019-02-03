import TokenService from "../services/TokenService";
import UserService from "../services/User.service";
import router from "../router";

const userId = UserService.getUserId() || false;

const UserStore = {
  state: {
    auth: false,
    accessToken: TokenService.getToken(),
    user: userId ? UserService.getUserById(userId) : {}
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
      router.push('/login');
    }
  },

  mutations: {
    logoutSuccess(state, accessToken) {
      state.auth = false;
      state.user = {};
      state.accessToken = accessToken;
    }
  }
};

export default UserStore;

