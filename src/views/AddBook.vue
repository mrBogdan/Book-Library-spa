<template>
  <div class="container">
    <Header/>
    <div class="main">
      <h1>Add book</h1>
      <div v-if="error" class="error-block flex centered">
        <ul>
          <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
        </ul>
      </div>
      <div class="add-book flex">
        <form class="flex" @submit.prevent="addBook" enctype="multipart/form-data">
          <div class="group-set">
            <p>Book name</p>
            <input type="text" v-model="BookModel.name" placeholder="Book name">
          </div>
          <div class="group-set">
            <p>Book author: </p>
            <input type="text" v-model="BookModel.author" placeholder="Book author">
          </div>
          <div class="group-set">
            <p>Published year</p>
            <input type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" v-model="BookModel.year"
                   placeholder="Published year">
          </div>
          <div class="group-set">
            <p>Image of book</p>
            <input type="file" @change="setFile">
          </div>
          <div class="group-set">
            <p>Genre </p>
            <select v-model="BookModel.genre">
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </div>
          <button class="btn">Add book</button>
        </form>
      </div>
    </div>
    <Footer/>
    <Model v-if="showModal" @close="showModal = false">
      <h3 slot="header">{{  }}</h3>
      <div slot="body">custom byd</div>
    </Model>
  </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  import Model from "../components/Modal"
  import ApiService from "../services/ApiService";
  import UserService from "../services/User.service";
  import TokenService from "../services/TokenService";

  export default {
    name: "AddBook",
    data () {
      let error = false;
      const errors = [];

      const BookModel = {
        name: "",
        year: "",
        author: "",
        genre: "",
        image_book: ""
      };

      let genres = [];

      ApiService.get('http://localhost/genre/all')
        .then((res) => {
          const resGenres = res.data.data;

          for ( let i = 0; i < resGenres.length; ++i ) {
            genres.splice(i, 1, resGenres[i]);
          }

        })
        .catch(err => {
          console.error(err);
        });

      let modalHeader = "";

      return {
        BookModel,
        genres,
        error,
        errors,
        modalHeader,
        showModal: false
      }
    },
    components: {
      Header,
      Footer,
      Model
    },

    methods: {
      addBook () {
        const self = this;
        const fd = new FormData();

        for ( const key in this.BookModel ) {
          if ( this.BookModel.hasOwnProperty(key) && key !== 'image_book' ) {
            fd.set(key, this.BookModel[key]);
          }
        }
        fd.set('uid', UserService.getUserId());
        fd.append('image_book', this.BookModel.image_book, this.BookModel.image_book.name);

        ApiService.post('http://localhost/book/create', fd, {
          headers: {
            'Authorization': `Basic ${ TokenService.getToken() }`
          },
          withCredentials: true
        })
          .then(res => {
            self.error = false;
            self.modalHeader = "Success added";
            self.showModal = true;
          })
          .catch(err => {
            self.error = true;
            const errors = err.response.data.errors;

            if ( !errors ) {
              return;
            }

            for ( let i = 0; i < errors.length; ++i ) {
              self.errors.splice(i, 1, errors[i]);
            }
          });
      },

      setFile (e) {
        this.BookModel.image_book = e.target.files[0];
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../styles/variables"
  @import "../styles/button"

  .add-book
    flex-direction: column
    align-items: center

    form
      flex-direction: column

      & > *
        margin-bottom: 20px
        height: 30px

  .error-block
    ul
      li
        color: $error
        list-style: none
        padding: 0
        text-align: left
</style>