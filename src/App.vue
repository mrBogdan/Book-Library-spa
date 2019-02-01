<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";
import store from "./store";

export default {
  name: 'app',
  router,
  store,
}
</script>

<style lang="sass" src="./styles/main.sass"></style>
