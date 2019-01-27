<template>
	<div class="header flex centered">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/login">Login</router-link>
			<router-link to="/register">Register</router-link>
		</nav>
	</div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="sass">
	.header
		grid-area: header
</style>
<style lang="sass" scoped src="../styles/header.sass"></style>