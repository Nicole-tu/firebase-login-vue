<template>
	<div>
		<div class="settings-header is-hidden-mobile">
			<h5 class="title">Your Profile Data</h5>
		</div>
		<div class="columns">
			<div class="column">
				<figure
					class="image is-128x128"
					style="margin:auto;"
				>
					<img
						class="image
				is-rounded"
						:src="
					fromProvider?userProfile.avatar:require('@assets/img/avatar.png')"
					>
				</figure>
				<form @submit.prevent>
					<div class="field">
						<label class="label">Name</label>
						<div class="control">
							<template v-if="fromProvider">
								{{userProfile.name}}
							</template>
							<input
								v-else
								class="input"
								type="text"
								v-model.trim="name"
								:placeholder="userProfile.name"
							>
						</div>
					</div>
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							{{userProfile.email}}
						</div>
					</div>

					<button
						v-if="!fromProvider"
						@click="updateProfile()"
						class="button is-primary"
					>Update Profile</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Profile',
	data() {
		return {
			name: ''
		}
	},
	computed: {
		...mapGetters(['userProfile']),
		fromProvider() {
			return Object.keys(this.userProfile).includes('avatar');
		}
	},
	methods: {
		updateProfile() {
			this.$store.dispatch('updateProfile', {
				name: this.name !== '' ? this.name : this.userProfile.name
			})

			this.name = ''
		}
	}
}
</script>
