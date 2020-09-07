<template>
	<div
		class="modal"
		:id="id"
		v-bind:class="{ 'is-active': show }"
	>
		<div class="modal-background" />
		<div class="modal-content">
			<div class="box">
				<slot name="content"></slot>
			</div>
		</div>
		<button
			class="modal-close is-large"
			aria-label="close"
			@click="show=false"
		/>
	</div>
</template>

<script>
export default {
	name: 'BoxModal',
	props: {
		id: { type: String, default: 'box-modal' },
		isShowModal: { type: Boolean, default: false }
	},
	data() {
		return {
			show: false
		}
	},
	watch: {
		isShowModal(to) {
			this.show = to
		}
	}
}
</script>
