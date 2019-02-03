<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Login</h1>
      <div class="login-form flex centered">
        <input type="email" v-model="LoginModel.email" name="email" placeholder="Email"/>
        <input type="password" v-model="LoginModel.password" name="password" placeholder="Password"/>
        <button type="button" @click="login()">Login</button>
      </div>

      <div v-if="ErrorModel.err"> {{ ErrorModel.errMsg }}</div>
    </div>
    <SideBar/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import SideBar from '../components/SideBar'
  import Footer from '../components/Footer'
  import UserService from '../services/User.service'

  export default {
    name: "Login",
    data () {
      const LoginModel = {
        email: "",
        password: ""
      };

      const ErrorModel = {
        err: false,
        errMsg: ""
      };

      return {
        LoginModel,
        ErrorModel
      }
    },
    components: {
      Header,
      SideBar,
      Footer
    },
    methods: {
      login () {
          if (!this.LoginModel.email || !this.LoginModel.password) {
            this.ErrorModel.err = true;
            this.ErrorModel.errMsg = "Fill correct values";
            return;
          }

          UserService.login(this.LoginModel.email, this.LoginModel.password)
            .then(res => {
              console.log(res.user);

              UserService.saveUserId(res.user.id);
              this.$store.commit('setUser', res.user);
              this.$store.state.auth = true;
              this.$store.state.accessToken = res.token;

            })
            .catch(err => {
              this.ErrorModel.err = true;
              this.ErrorModel.errMsg = err.message;
            });
      }
    },

  }
</script>

<style lang="sass" scoped>
  .login-form
    flex-direction: column

    & > *
      margin-bottom: 10px
</style>