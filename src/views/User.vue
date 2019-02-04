<template>
  <div class="container">
    <Header/>
    <div class="main flex">
      <div class="flex top">
        <img :src="'http://localhost/' + user.path" alt="user photo" width="300">

        <div style="text-align: left;">
          <p>{{ user.first_name }}</p>
          <p>{{ user.surname }}</p>
          <p>{{ user.telephone }}</p>
          <p>{{ user.birthdate }}</p>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <div class="flex top">
        <div class="grid">
          <div v-for="(item, index) in userBooks" :key="index" class="grid-item">
            <a href=""><img :src="'http://localhost/' + item.path" alt="Book image" width="200"></a>
            <p>{{ item.name }}</p>
            <img src="../assets/trash.png" alt="Remove button" title="Remove?" @click="removeBook" :data-id="item.id" class="remove-btn">
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import UserService from "../services/User.service";
  import ApiService from "../services/ApiService";

  export default {
    name: "User",
    data () {
      const self = this;
      let user = {};
      let userBooks = [];

      const userId = UserService.getUserId();

      UserService.getUserById(userId)
        .then(res => {
          const resUser = res.data.data;

          for ( const key in resUser ) {
            if ( resUser.hasOwnProperty(key) ) {
              self.$set(user, key, resUser[key]);
            }
          }

          self.$store.commit('setAuth', true);
          self.$store.commit('setUser', resUser);
        });

      UserService.getUserBooks(userId).then(res => {
        const resBooks = res.data.data;

        for ( let i = 0; i < resBooks.length; ++i ) {
          userBooks.splice(i, 1, resBooks[i]);
        }

        self.$store.commit('setBooks', resBooks);
      });


      return {
        user,
        userBooks
      }
    },
    methods: {
      removeBook (event) {
        const target = event.srcElement.dataset.id;
        const userId = this.$store.getters.getUser.id;

        ApiService.delete(`http://localhost/book/${target}/user/${userId}`)
          .then(res => {
            console.log(res);
          });
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="sass" scoped>
  .main
    justify-content: space-between

    .grid
      display: grid
      grid-template-columns: 1fr 1fr 1fr
      grid-gap: 20px

      .grid-item
        position: relative

    .remove-btn
      width: 30px
      position: absolute
      bottom: 15px
      right: 0
      cursor: pointer
</style>