<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Login</h1>
      <div class="login-form flex centered">
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
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


  export default {
    name: "Login",
    data () {
      const test = "";
      return {
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

        const bodyFormData = new FormData();
        bodyFormData.set('email', 'dfgdfgdg@dfgdfg.df');
        bodyFormData.set('password', 'dfgdfgfdg');

        axios({
          url: 'http://book.local/user/login',
          method: 'post',
          data: bodyFormData
        }).then(res => {
          console.log(res);
          self.test = res.data.data.user;
          self.$router.push({name: '/account'});
          console.log(self.$router.options.routes);
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