<template>
	<section>
		<div class="col1">
			<h3>Setting Profile Data</h3>

			<form @submit.prevent>
				<label for="name">Name</label>
				<input
					v-model.trim="name"
					type="text"
					:placeholder="userProfile.name"
					id="name"
				/>

				<label for="title">Job Title</label>
				<input
					v-model.trim="title"
					type="text"
					:placeholder="userProfile.title"
					id="title"
				/>

				<button
					@click="updateProfile()"
					class="button"
				>Update Profile</button>
			</form>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Profile'
}
</script>
