<template>
	<div class="container">
		<Header/>
		<SideBar />
		<div class="main">Register</div>
		<Footer/>
	</div>
</template>

<script>
  import Header from './Header'
  import SideBar from './SideBar'
  import Footer from './Footer'

  export default {
    name: "Register",
    components: {
      Header,
      SideBar,
      Footer
    }
  }
</script>

<style lang="sass" src="../styles/main.sass"></style>