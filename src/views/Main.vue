<template>
	<div class="jx-page-outer">
		<Header />
		<div class="jx-content-wrapper">
			<Aside v-if="disableAside" />
			<router-view />
		</div>
		<Footer />
		<loading-overlay :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
import Header from '@views/layouts/Header'
import Aside from '@views/layouts/Aside'
import Footer from '@views/layouts/Footer'
import LoadingOverlay from '@components/LoadingOverlay'

export default {
	name: 'Main',
	components: {
		Header,
		Aside,
		Footer,
		LoadingOverlay
	},
	data() {
		return {
			pageShowAside: ['Error']
		}
	},
	computed: {
		isShowLoading() {
			return this.$store.getters.showLoading
		},
		disableAside() {
			return !this.pageShowAside.includes(this.$route.meta.root)
		}
	},
	methods: {
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize)
	},
	mounted() {
		this.$root.$on('bv::tooltip::show', bvEvent => {
			let hasScrollBar =
				document.body.scrollHeight >
				(window.innerHeight || document.documentElement.clientHeight)
			bvEvent.vueTarget.placement = 'bottom'
			if (hasScrollBar) {
				bvEvent.vueTarget.offset = 0
			} else {
				bvEvent.vueTarget.offset = 10
			}
			bvEvent.vueTarget.activeTrigger.hover = true
			bvEvent.vueTarget.delay = { show: 200, hide: 100 }
		})
	},
	created() {
		// this.getUserProfile()
	}
}
</script>
