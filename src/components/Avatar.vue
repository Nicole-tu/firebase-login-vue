<template>
	<figure class="image is-64x64">
		<img
			class="image is-rounded"
			:src="userProfile.avatar==null?require('@assets/img/avatar.png'):userProfile.avatar"
		/>
	</figure>
</template>

<script>
export default {

}
</script>

<style>
</style>
