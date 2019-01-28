<template>
	<div class="header flex">
		<div class="logo">
			<router-link to="/" class="not-active">Book Library</router-link>
		</div>
		<nav>
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