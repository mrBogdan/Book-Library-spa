import Vue from "vue";
import Vuex from "vuex";
import Store from "./Store"

Vue.use(Vuex);

const store = new Vuex.Store(Store);

export default store;