<template>
	<nav class="navbar is-fixed-top is-primary">
		<div class="nav-header container">
			<div class="navbar-brand">
				<router-link
					class="navbar-item brand-text"
					to="/"
					exact
				>
					<h4>
						<i class="fas fa-warehouse" />
						Supplies
					</h4>
				</router-link>
				<a
					role="button"
					class="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navMenu"
					:class="{ 'is-active': isOpen }"
					@click="isOpen = !isOpen"
				>
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<div
				id="navMenu"
				class="navbar-menu"
				:class="{ 'is-active': isOpen }"
			>
				<div class="navbar-start">
					<router-link
						class="navbar-item"
						to="/dashboard"
						exact
					>
						<i class="fas fa-tachometer-alt" />Dashboard
					</router-link>
					<router-link
						class="navbar-item"
						to="/inventory"
						exact
					>
						<i class="fa fa-archive" />Inventory
					</router-link>
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link">
							<i class="fas fa-sliders-h" />Settings
						</a>

						<div class="navbar-dropdown">
							<router-link
								class="navbar-item"
								to="/settings/category"
								exact
							>
								Category
							</router-link>
							<router-link
								class="navbar-item"
								to="/settings/profile"
								exact
							>
								Profile
							</router-link>
						</div>
					</div>
					<router-link
						class="navbar-item"
						to="/styleGuide"
						exact
					>
						<i class="fas fa-paint-brush" />Style Guides UI
					</router-link>
				</div>
				<hr class="navbar-divider" />
				<div class="navbar-end">
					<a
						@click="logout"
						class="navbar-item"
					>
						<span>Sign out</span>
						<span class="icon is-small">
							<i class="fas fa-sign-out-alt" />
						</span>
					</a>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout').then(() => {
				this.$router.push('/login')
			})
		}
	}
}
</script>
