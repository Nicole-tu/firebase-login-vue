<template>
	<div>
		<nav-bar />
		<router-view />
		<loading-overlay :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
import NavBar from '@views/layouts/NavBar'
import LoadingOverlay from '@components/LoadingOverlay'

export default {
	name: 'Main',
	components: {
		NavBar,
		LoadingOverlay
	},
	data() {
		return {
		}
	},
	computed: {
		isShowLoading() {
			return this.$store.getters.showLoading
		}
	},
	methods: {
	},
	mounted() {
	}
}
</script>
