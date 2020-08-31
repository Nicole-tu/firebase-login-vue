<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: "app",
	data() {
		return {

		};
	},
	watch: {
		$route(to) {
			if (to.name === 'Login' && localStorage.getItem('token')) {
				localStorage.removeItem('token');
			}
		}
	}
};
</script>
