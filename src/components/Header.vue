<template>
  <div class="header flex">
    <div class="logo">
      <router-link to="/" class="not-active">Book Library</router-link>
    </div>
    <nav v-if="!$store.state.auth">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <nav v-if="$store.state.auth">
      <router-link to="/account">Account</router-link>
      <router-link to="/add-book">Add book</router-link>
      <button class="as-link" @click="logout">Logout</button>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      logout() {
        const self = this;

        this.$store.dispatch('logout')
          .then(() => {
            self.$router.push('/login');
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
</script>

<style lang="sass">
  .header
    grid-area: header
</style>
<style lang="sass" scoped src="../styles/header.sass"></style>