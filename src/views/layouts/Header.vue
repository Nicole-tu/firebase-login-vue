<template>
	<header class="jx-header">
		<router-link
			:to="landingPage"
			class="jx-header-link logo"
		>
			<img alt />
		</router-link>
		<ol class="jx-breadcrumb">
			<li
				v-for="(link, l) in links"
				:key="l"
			>
				<span>{{ link.name }}</span>
			</li>
		</ol>
		<div class="jx-header-profile ml-auto dropdown">
			<div class="text">
				<h5 class="title">
					{{ currentLang == "en" ? userData.name : userData.CName }}
				</h5>
				<div class="sub-title">
					{{ currentLang == "en" ? userData.jobName : userData.jobCName }}
				</div>
			</div>
			<div
				class="jx-avatar self"
				:style="{ 'background-image': 'url(' + userPhoto + ')' }"
			></div>
		</div>
		<a
			href="javascript:;"
			class="jx-header-link logout"
			@click="logout"
		>
			<span>{{ $t("common.logout") }}</span>
		</a>

		<!-- Mobile dropdown -->
		<div
			class="dropdown d-lg-none"
			id="logout-dropdown"
		>
			<a
				class="jx-header-link dropdown-toggle"
				role="button"
				data-toggle="dropdown"
				@click="toggleDropdown('logout-dropdown')"
			>
				<div
					class="jx-avatar self"
					:style="{ 'background-image': 'url(' + userPhoto + ')' }"
				></div>
			</a>
			<div class="dropdown-menu dropdown-menu-right">
				<div class="dropdown-item disabled">
					<div
						class="jx-avatar self"
						:style="{ 'background-image': 'url(' + userPhoto + ')' }"
					></div>
					<h5 class="title">
						{{ currentLang == "en" ? userData.name : userData.CName }}
					</h5>
					<div class="sub-title">
						{{ currentLang == "en" ? userData.jobName : userData.jobCName }}
					</div>
				</div>
				<a
					class="dropdown-item logout"
					href="javascript:;"
					@click="logout"
				>{{
          $t("common.logout")
        }}</a>
			</div>
		</div>
	</header>
</template>
<script>
export default {
	name: 'Header',
	computed: {
		currentLang() {
			return this.$store.getters.currentLang || localStorage.getItem('lang')
		},
		userData() {
			return this.$store.getters.userData
		},
		userPhoto() {
			return this.userData.photo
		},
		links() {
			if (!this.$route.meta.rootNameKey) {
				return []
			}
			if (this.$route.meta.pageNameKey && this.$route.meta.rootNameKey) {
				return [
					{
						name: this.$t(`aside_menu.${this.$route.meta.rootNameKey}`)
					},
					{
						name: this.$t(
							`aside_menu.${this.$route.meta.pageNameKey(this.$route)}`
						)
					}
				]
			}
			return [
				{
					name: this.$t(`aside_menu.${this.$route.meta.rootNameKey}`)
				}
			]
		},
		landingPage() {
			return this.$store.getters.landingPage
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout').then(() => this.$router.push('Login'))
		}
	}
}
</script>

<style>
.jx-breadcrumb > li span {
	padding: 0.4rem 0.8rem;
	color: #ffffff;
	font-size: 1.6rem;
}
</style>
