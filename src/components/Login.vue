<template>
	<div class="container">
		<Header/>
		<div class="main">
		
		</div>
		<SideBar/>
		<Footer/>
	</div>
</template>

<script>
  import Header from './Header'
  import SideBar from './SideBar'
  import Footer from './Footer'

  export default {
    name: "Login",
    components: {
      Header,
      SideBar,
      Footer
    }
  }
</script>

<style lang="sass">

</style>