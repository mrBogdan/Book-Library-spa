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
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import SideBar from '../components/SideBar'
  import Footer from '../components/Footer'
  import ApiService from "../services/ApiService";

  export default {
    name: "Register",
    data () {
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
        RegisterModel
      }
    },
    components: {
      Header,
      Footer
    },
    methods: {
      handleSubmit (e) {
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
          .then((res) => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
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