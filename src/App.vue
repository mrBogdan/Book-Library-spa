<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";
import store from "./store";
import UserService from "./services/User.service";
import User from "./views/User";

export default {
  name: 'app',
  router,
  store,
  beforeMount() {
    const self = this;
    const userId = UserService.getUserId();

    UserService.getUserById(userId)
      .then(res => {
        const resUser = res.data.data;

        self.$store.commit('setAuth', true);
        self.$store.commit('setUser', resUser);
      })
      .catch(err => {
        self.$store.dispatch('logout');
      });

    UserService.getUserBooks(userId).then(res => {
      const resBooks = res.data.data;
      self.$store.commit('setBooks', resBooks);
    });
  }
}
</script>
