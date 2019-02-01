import Vue from "vue";
import App from "./App.vue";
import TokenService from "./services/TokenService";
import ApiService from "./services/ApiService";

Vue.config.productionTip = false;

ApiService.init('http://localhost');

if (TokenService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  render: (h) => h(App)
}).$mount('#app');
