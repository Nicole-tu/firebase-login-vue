<template>
	<div>
		<Header />
		<router-view />
		<Footer />
		<loading-overlay :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
import Header from '@views/layouts/Header'
import LoadingOverlay from '@components/LoadingOverlay'

export default {
	name: 'Main',
	components: {
		Header,
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
