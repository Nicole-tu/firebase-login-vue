<template>
	<figure
		class="image"
		:class="size"
	>
		<img
			class="image is-rounded"
			:src="avatarPath"
		/>
	</figure>
</template>

<script>
export default {
	name: 'Avatar',
	data() {
		return {
			avatarPath: ''
		}
	},
	props: {
		size: { type: String, defaul: 'is-64x64' }
	},
	computed: {
		userProfile() {
			return this.$store.getters.userProfile;
		}
	},
	mounted() {
		if (this.userProfile.avatar == null) {
			this.avatarPath = `https://avatar.oxro.io/avatar.svg?name=${this.userProfile.name}&length=1`;
		} else {
			this.avatarPath = this.userProfile.avatar;
		}
	}
}
</script>

