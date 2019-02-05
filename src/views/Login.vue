<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Login</h1>
      <div class="login-form flex centered">
        <input type="email" v-model="LoginModel.email" name="email" placeholder="Email"/>
        <input type="password" v-model="LoginModel.password" name="password" placeholder="Password"/>
        <button class="btn" @click="login()">Login</button>
      </div>

      <div v-if="ErrorModel.err" class="error-message"> {{ ErrorModel.errMsg }}</div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import UserService from '../services/User.service'
  import ApiService from "../services/ApiService";

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
      Footer
    },
    methods: {
      login () {
          if (!this.LoginModel.email || !this.LoginModel.password) {
            this.ErrorModel.err = true;
            this.ErrorModel.errMsg = "Fill correct values";
            return;
          }
          const self = this;

          UserService.login(this.LoginModel.email, this.LoginModel.password)
            .then(res => {
              UserService.getUserBooks(res.user.id).then((res) => {
                self.$store.commit('setBooks', res);
              });

              UserService.saveUserId(res.user.id);
              this.$store.commit('setUser', res.user);
              this.$store.state.auth = true;
              this.$store.state.accessToken = res.token;
              this.$router.push('/account');
            })
            .catch(err => {
              this.ErrorModel.err = true;
              this.ErrorModel.errMsg = err.message;
            });
      }
    },

  }
</script>

<style lang="sass" src="../styles/main.sass"></style>
<style lang="sass" scoped>
  @import "../styles/variables"

  .login-form
    flex-direction: column

    & > *
      margin-bottom: 10px
  .error-message
    color: $error
</style>