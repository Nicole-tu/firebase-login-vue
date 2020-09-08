<template>
	<!-- START NAV -->
	<nav class="navbar is-fixed-top is-primary">
		<div class="nav-header container">
			<div class="navbar-brand">
				<router-link
					class="navbar-item brand-text"
					to="/"
				>
					<h3>
						Supplies inventory
					</h3>
				</router-link>
				<a
					role="button"
					class="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navMenu"
				>
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<div
				id="navMenu"
				class="navbar-menu"
			>
				<div class="navbar-start">
					<router-link
						class="navbar-item"
						to="/dashboard"
					>
						<i class="fas fa-tachometer-alt" />Dashboard
					</router-link>
					<router-link
						class="navbar-item"
						to="/inventory"
					>
						<i class="fa fa-archive" />Inventory
					</router-link>
					<router-link
						class="navbar-item"
						to="/report"
					>
						<i class="fas fa-chart-bar" />Report
					</router-link>
					<router-link
						class="navbar-item"
						to="/setting"
					><i class="fas fa-sliders-h" />Settings
					</router-link>
				</div>
			</div>
			<button
				@click="logout"
				class="button is-primary is-inserted"
			>
				<span>Sign out</span>
				<span class="icon is-small">
					<i class="fas fa-sign-out-alt" />
				</span>
			</button>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	methods: {
		logout() {
			this.$store.dispatch('logout').then(() => {
				this.$router.push('/login')
			})
		}
	}
}
</script>
