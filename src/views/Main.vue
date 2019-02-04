<template>
  <div class="container">
    <Header/>
    <div class="main flex top">
      <table class="user-list">
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Rating</th>
        </tr>
        <tr class="tr" v-for="(item, index) in userList" :key="index">
          <td>{{ +index + 1 }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.surname }}</td>
          <td>{{ item.rating }}</td>
        </tr>
      </table>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import ApiService from "../services/ApiService";

  export default {
    name: "Main",
    data () {
      let userList = {};
      const self = this;

      function setList(list) {
        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            self.$set(userList, key, list[key]);
          }
        }
      }

      ApiService.get('http://localhost/user/rating')
        .then(list => {
          setList(list.data.data);
        })
        .catch(err => {
          console.log(err);
        });


      return {
        userList
      }
    },
    components: {
      Header,
      Footer
    },
  }
</script>

<style lang="sass" scoped>
  .main
    .user-list
      width: 100%
  .tr
    td
      padding: 20px
</style>