<template>
	<div>
		<div class="box">
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
							<strong>{{greeting}}, {{userProfile.name}}</strong>
							<br>
							Let's see you inventory
						</p>
					</div>
				</div>
			</article>
		</div>

		<div class="box">
			<apexchart
				width="500"
				type="bar"
				:options="options"
				:series="series"
			></apexchart>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
	data() {
		return {
			options: {
				chart: {
					id: 'vuechart-example'
				},
				xaxis: {
					categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
				}
			},
			series: [{
				name: 'series-1',
				data: [30, 40, 45, 50, 49, 60, 70, 91]
			}]
		}
	},
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
