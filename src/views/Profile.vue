<template>
	<div>
		<h5>Setting Profile Data</h5>

		<form @submit.prevent>
			<label for="name">Name</label>
			<input
				v-model.trim="name"
				type="text"
				:placeholder="userProfile.name"
				id="name"
			/>

			<button
				@click="updateProfile()"
				class="button"
			>Update Profile</button>
		</form>
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
	computed: mapGetters(['userProfile']),
	methods: {
		updateProfile() {

		}
	}
}
</script>
