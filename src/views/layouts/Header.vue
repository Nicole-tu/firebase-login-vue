<template>
	<header>
		<router-link
			class="logo"
			:to="'/'"
		>
			<img alt />
		</router-link>

		<a
			@click="logout"
			class="button is-primary is-rounded is-small is-inverted"
		>Log out</a>

	</header>
</template>
<script>
export default {
	name: 'Header',
	computed: {
		userData() {
			return this.$store.getters.userData
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout').then(() => {
				this.$router.push('/login')
			}).catch(err => alert(err));
		}
	}
}
</script>
