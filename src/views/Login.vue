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
  import axios from 'axios'

  export default {
    name: "Login",
    data() {
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
        //testUser: e: p: shordfgdfg
        axios.post('http://ms.bogdan.store/user/login', {
          
        }).then((res) => {
          self.test = res.data;
        });
        //axios
        //  .get(, {
        //    crossdomain: true
        //  })
        //  .then((res) => self.test = res);
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