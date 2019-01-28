<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Login</h1>
      <div class="login-form flex centered">
        <input type="email" name="email" v-model="User.email" placeholder="Email"/>
        <input type="password" name="password" v-model="User.password" placeholder="Password"/>
        <button type="button" @click="login()">Login</button>
      </div>

      <div>{{ test }}</div>
    </div>
    <SideBar/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import SideBar from '../components/SideBar'
  import Footer from '../components/Footer'
  import { User as UserModel } from '../models/User.model'

  const User = new UserModel();
  User.name = "Bogdan";
  const test = "";

  const options = {
    url: 'ms.bogdan.store/health',
    method: 'GET',
  };

  export default {
    name: "Login",
    data() {
      return {
        User,
        test
      }
    },
    components: {
      Header,
      SideBar,
      Footer
    },
    methods: {
      login () {
        const self = this;

        User.fetch(options).then((res) => {
          self.test = res;
        });
      }
    }
  }
</script>

<style lang="sass" scoped>
  .login-form
    flex-direction: column

    & > *
      margin-bottom: 10px

</style>