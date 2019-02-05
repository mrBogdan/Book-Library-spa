<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit" class="register-form flex centered" id="regForm"
            enctype="multipart/form-data">
        <input type="text" v-model="RegisterModel.first_name" placeholder="Name">
        <input type="text" v-model="RegisterModel.surname" placeholder="Surname">
        <input type="email" v-model="RegisterModel.email" placeholder="Email">
        <input type="password" v-model="RegisterModel.password" placeholder="Password">
        <input type="tel" v-model="RegisterModel.telephone" placeholder="Telephone">
        <input type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" v-model="RegisterModel.birthdate" placeholder="Birthdate">
        <input type="file" @change="setFile">
        <button class="btn">Register</button>
      </form>
      <div v-if="error" class="flex centered error-block">
        <ul>
          <li v-for="(item, index) in errors" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import ApiService from "../services/ApiService";

  export default {
    name: "Register",
    data () {
      let error = false;
      let errors = [];

      const RegisterModel = {
        first_name: "",
        surname: "",
        email: "",
        password: "",
        telephone: "",
        birthdate: "",
        image_user: ""
      };

      return {
        RegisterModel,
        error,
        errors
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      handleSubmit () {
        const self = this;
        const fd = new FormData();

        for ( const key in this.RegisterModel ) {
          if (this.RegisterModel.hasOwnProperty(key) && key !== 'image_user')
            fd.set(key, this.RegisterModel[key]);
        }

        fd.append('image_user', this.RegisterModel.image_user, this.RegisterModel.image_user.name);

        ApiService.post('http://localhost/user/register', fd,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(() => {
            self.$router.push('/login');
          })
          .catch(err => {
            console.error(err);

            const errors = err.response.data.errors;
            self.error = true;

            for ( let i = 0; i < errors.length; ++i ) {
              self.errors.splice(i, 1, errors[i]);
            }
          });
      },

      setFile (e) {
        this.RegisterModel.image_user= e.target.files[0];
      }
    }
  }
</script>

<style lang="sass" src="../styles/main.sass"></style>
<style lang="sass" scoped>
  .register-form
    flex-direction: column

    & > *
      margin-bottom: 10px
</style>