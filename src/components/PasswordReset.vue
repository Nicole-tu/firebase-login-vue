<template>
	<box-modal
		:id="'modal-forget-password'"
		:is-show-modal="isShowModal"
	>
		<template #content>
			<div v-if="!showSuccess">
				<h5>Enter your email to reset your password</h5>
				<hr />
				<form @submit.prevent>
					<div class="field">
						<p class="control has-icons-left">
							<input
								class="input"
								type="email"
								placeholder="Email"
								v-model.trim="email"
							>
							<span class="icon is-small is-left">
								<i class="fas fa-envelope" />
							</span>
						</p>
					</div>
				</form>
				<p
					v-if="errorMsg !== ''"
					class="has-text-danger"
				>{{ errorMsg }}</p>
				<br />
				<br />
				<div class="field is-grouped is-grouped-right">
					<p class="control">
						<a
							class="button is-light"
							@click="$emit('close')"
						>
							Cancel
						</a>
					</p>
					<p class="control">
						<a
							class="button is-primary"
							@click="resetPassword()"
						>
							Reset
						</a>
					</p>
				</div>
			</div>
			<div
				class="has-text-centered"
				v-else
			>
				<p class="has-text-success">Success! Check your email for a reset link.</p>
				<br />
				<button
					class="button is-primary is-inverted"
					@click="$emit('close')"
				>OK</button>
			</div>
		</template>
	</box-modal>
</template>

<script>
import BoxModal from './BoxModal';
import { auth } from '@/firebase';

export default {
	name: 'PasswordReset',
	components: { BoxModal },
	props: {
		isShowModal: { type: Boolean, default: false }
	},
	data() {
		return {
			email: '',
			showSuccess: false,
			errorMsg: ''
		}
	},
	methods: {
		async resetPassword() {
			this.errorMsg = ''
			try {
				await auth.sendPasswordResetEmail(this.email)
				this.showSuccess = true
			} catch (err) {
				this.errorMsg = err.message
			}
		}
	}
}
</script>
