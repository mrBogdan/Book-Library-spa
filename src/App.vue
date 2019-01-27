<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Router from './router'

export default {
  name: 'app',
  router: Router
}
</script>

<style lang="sass" src="./styles/main.sass"></style>
