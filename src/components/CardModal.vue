<template>
	<div
		class="modal"
		style="position: fixed;"
		:id="id"
		:class="{ 'is-active': show }"
	>
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{title}}</p>
				<button
					class="delete"
					aria-label="close"
					@click="onCancel"
				/>
			</header>
			<section class="modal-card-body">
				<slot name="modal-content"></slot>
			</section>
			<footer
				class="modal-card-foot"
				style="justify-content: flex-end;"
			>
				<div class="buttons">
					<button
						class="button is-light"
						@click="onCancel"
					>Cancel</button>
					<button
						class="button is-primary"
						:class="{'is-danger':isDanger,'is-warning':isWarning,'is-success':isSuccess}"
						@click="onConfirm"
					>{{confirmBtnName}}</button>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardModal',
	props: {
		id: { type: String, default: 'card-modal' },
		isShowModal: { type: Boolean, default: false },
		isDanger: { type: Boolean, default: false },
		isWarning: { type: Boolean, default: false },
		isSuccess: { type: Boolean, default: false },
		confirmBtnName: { type: String, default: 'Confirm' },
		title: { type: String, default: 'Title' }
	},
	data() {
		return {
			show: false
		}
	},
	watch: {
		isShowModal(to) {
			this.show = to;
			document.documentElement.className = to ? 'is-clipped' : '';
		}
	},
	methods: {
		onConfirm() {
			this.$emit("confirm");
		},
		onCancel() {
			this.$emit("cancel");
		}
	}
}
</script>
