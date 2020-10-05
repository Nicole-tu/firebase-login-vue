<template>
	<div
		class="modal"
		style="position: fixed;"
		:id="id"
		:class="{ 'is-active': show }"
	>
		<div class="modal-background" />

		<div class="confirm-modal-content">
			<div class="box">
				{{message}}
				<div class="confirm-modal-footer">
					<div class="field is-grouped is-grouped-right">
						<p class="control">
							<a
								class="button is-light"
								@click="onCancel"
							>Cancel</a>
						</p>
						<p class="control">
							<a
								class="button is-primary"
								:class="{'is-danger':isDanger,'is-warning':isWarning,'is-success':isSuccess}"
								@click="onConfirm"
							>{{confirmBtnName}}</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmModal',
	props: {
		id: { type: String, default: 'confirm-modal' },
		isShowModal: { type: Boolean, default: false },
		isDanger: { type: Boolean, default: false },
		isWarning: { type: Boolean, default: false },
		isSuccess: { type: Boolean, default: false },
		confirmBtnName: { type: String, default: 'Confirm' },
		message: { type: String, default: '' }
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
