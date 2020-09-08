<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: "App",
	computed: mapGetters(['status', 'successInfo', 'errorInfo']),
	watch: {
		$route(to) {
			if (to.name === 'Login' && localStorage.getItem('token')) {
				localStorage.removeItem('token');
			}
		},
		status(to, from) {
			if (to === 'success') {
				this.$toast.success({
					message: this.successInfo
				});
			} else if (to === 'error') {
				this.$toast.error({
					message: this.errorInfo
				})
			}
		}
	}
};
</script>
