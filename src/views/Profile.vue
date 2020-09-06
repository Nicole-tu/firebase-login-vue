<template>
	<div>123
		<a
			@click="logout"
			class="button is-primary is-rounded is-medium is-inverted"
		>Log out</a>
	</div>

</template>

<script>
export default {
	name: 'Profile',
	methods: {
		logout() {
			this.$store.dispatch('logout').then(() => {
				this.$router.push('/login')
			}).catch(err => alert(err));
		}
	}
}
</script>
