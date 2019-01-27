<template>
	<div class="container">
		<Header/>
		<SideBar/>
		<div class="main flex centered">
			<table class="user-list">
				<tr>
					<th>Number</th>
					<th>Name</th>
					<th>Surname</th>
					<th>Rating</th>
				</tr>
				<tr v-for="item in userList" :key="item.id">
					<td>{{ item.id }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.lastName }}</td>
					<td>{{ item.rating }}</td>
				</tr>
			</table>
		</div>
		<Footer/>
	</div>
</template>

<script>
  import Header from './Header'
  import SideBar from './SideBar'
  import Footer from './Footer'
  import mock from '../mock'

  export default {
    name: "Main",
    data () {
      return {
        userList: mock
      }
    },
    components: {
      Header,
      SideBar,
      Footer
    }
  }
</script>

<style lang="sass" scoped>
	.main
		.user-list
			width: 100%
</style>