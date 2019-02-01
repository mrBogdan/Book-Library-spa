import Vue from "vue";
import Vuex from "vuex";
import UserStore from "./UserStore"

Vue.use(Vuex);

const store = new Vuex.Store(UserStore);

export default store;