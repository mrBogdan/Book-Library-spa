<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <img :src="'http://localhost/' + Book.path" alt="Book image" width="300">
      <p>Book name: {{ Book.name }}</p>
      <p>Book author: {{ Book.author }}</p>
      <p>Published year: {{ Book.year }}</p>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import UserService from "../services/User.service";
  import ApiService from "../services/ApiService";
  import TokenService from "../services/TokenService";

  export default {
    name: "Book",
    data() {
      const userId = UserService.getUserId();
      const self = this;
      const bookId = this.$route.params.id;
      const resource = 'http://localhost/book/' + bookId + '/user/' + userId;
      const token = TokenService.getToken();
      let Book = {};

      function setBooks(list) {
        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            self.$set(Book, key, list[key]);
          }
        }
      }

      ApiService.get(resource, {
        headers: { 'Authorization': `Basic ${ token }` },
        withCredentials: true
      })
        .then(res => {
          console.log('res', res);
          setBooks(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });

      return {
        Book
      };
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style scoped>

</style>