<template>
  <div class="container">
    <Header/>
    <SideBar />
    <div class="main">Not found 404</div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import SideBar from '../components/SideBar'
  import Footer from '../components/Footer'

  export default {
    name: "NotFound",
    components: {
      Header,
      SideBar,
      Footer
    }
  }
</script>

<style scoped>

</style>