<template>
	<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@before-leave="beforeLeave"
	>
		<div
			class="toast"
			:class="['toast-'+type]"
			:style="{backgroundColor:toastBackgroundColor}"
			v-if="show"
		>
			<button
				class="toast-close-button"
				role="button"
				@click="hideToast"
			>×</button>
			<div class="toast-message">{{message}}</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Toast',
	data: () => {
		return {
			show: false,
			sto: null
		}
	},
	props: {
		type: {
			type: String,
			default: 'success'
		},
		position: {
			type: String,
			default: 'center'
		},
		message: {
			type: String
		},
		icon: {
			type: String
		}
	},
	beforeMount() {
		let toastContainer = document.querySelector(`.bulma-toast-container.toast-${this.positionClass}`)
		if (!toastContainer) {
			toastContainer = document.createElement('div')
			toastContainer.classList.add('bulma-toast-container')
			toastContainer.classList.add(`toast-${this.positionClass}`)
			document.body.appendChild(toastContainer)
		}
		toastContainer.appendChild(this.$el)
	},
	mounted() {
		setTimeout(() => this.showToast(), 0)
	},
	computed: {
		positionClass() {
			return this.position.split(' ').join('-')
		}

	},
	methods: {
		showToast() {
			this.show = true
			// this.sto = setTimeout(() => this.hideToast(), 1500)
		},
		hideToast() {
			clearTimeout(this.sto)
			this.show = false
		},
		beforeEnter(el) {
			el.style.animationDuration = '2000ms'
		},
		afterEnter(el) {
			this.$el.classList.add('animated')
			this.$el.classList.add('fadeIn')
		},
		beforeLeave(el) {
			el.style.animationDuration = '1500ms'
		}
	}
}
</script>
