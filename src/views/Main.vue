<template>
	<section class="is-fullheight">
		<nav-bar />
		<div class="hero-body main-content">
			<div class="container">
				<transition
					mode="out-in"
					enter-active-class="fadeIn"
					leave-active-class="fadeOut"
					appear
				>
					<router-view class="animated"></router-view>
				</transition>
			</div>
		</div>
		<page-loader :is-show="isShowLoading" />
	</section>
</template>

<script>
import NavBar from '@views/layouts/NavBar'
import PageLoader from '@components/PageLoader'

export default {
	name: 'Main',
	components: {
		NavBar,
		PageLoader
	},
	computed: {
		isShowLoading() {
			return this.$store.getters.showLoading
		}
	}
}
</script>
