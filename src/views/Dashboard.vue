<template>
	<div>
		<div class="greeting-item">
			<article class="media">
				<div class="media-left">
					<figure class="image is-64x64">
						<img
							class="image
				is-rounded"
							:src="
					userProfile.avatar==null?require('@assets/img/avatar.png'):userProfile.avatar"
						>
					</figure>
				</div>
				<div class="media-content">
					<div class="content">
						<p>
							<strong>Good {{greeting}}, {{userProfile.name}}</strong>
						</p>
					</div>
				</div>
			</article>
		</div>
		<div class="overview-items columns is-multiline is-mobile is-variable is-4 has-text-centered">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<span class="fa-stack fa-4x">
							<i class="fas fa-boxes fa-stack-2x"></i>
							<i class="fa fa-times fa-stack-1x has-text-danger"></i>
						</span>
					</div>
					<footer class="card-footer">
						<h5>
							Zero Stock Items
						</h5>
					</footer>
				</div>
			</div>
			<div class="column">
				<div class="card">
					<div class="card-content">
						<span class="fa-stack fa-4x">
							<i class="fas fa-box fa-stack-1x"></i>
							<i class="fas fa-ban fa-stack-2x has-text-danger"></i>
						</span>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="card">
					<div class="card-content">
						<p class="title">
							Current Items
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
	computed: {
		greeting() {
			return this.getDayPart();
		},
		userProfile() {
			return this.$store.getters.userProfile;
		}
	}
}
</script>
