<template>
	<div class="container">
		<Header/>
		<SideBar/>
		<div class="main flex centered">
			User page
		</div>
		<Footer/>
	</div>
</template>

<script>
  import Header from './Header'
  import SideBar from './SideBar'
  import Footer from './Footer'

  export default {
    name: "User",
    components: {
      Header,
      SideBar,
      Footer
    }
  }
</script>

<style scoped>

</style>