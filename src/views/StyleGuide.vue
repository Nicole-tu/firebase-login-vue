<template>
	<section class="is-fullheight">
		<nav-bar />
		<div class="hero-body main-content">
			<div class="box container">
				<div class="tabs is-boxed">
					<ul>
						<li
							v-for="(t,i) in tabComponents"
							:key="i"
							:class="{'is-active':currentTab === t.id}"
						>
							<a @click="changeTab(t.id)">
								<i :class="t.icon" />
								{{ t.name }}</a>
						</li>
					</ul>
				</div>
				<div class="tab-contents">
					<div
						class="tab-content"
						:class="{'is-active':currentTab === 0}"
					>
						<ul class="color-list">
							<li class="color-card">
								<div class="card">
									<div class="card-content has-background-primary">
									</div>
									<footer class="card-footer">
										<b>Primary</b>
										<br />#174B81
									</footer>
								</div>
							</li>
							<li class="color-card">
								<div class="card">
									<div class="card-content has-background-link">
									</div>
									<footer class="card-footer">
										<b>Link</b>
										<br />#263056
									</footer>
								</div>
							</li>
							<li class="color-card">
								<div class="card">
									<div class="card-content has-background-info">
									</div>
									<footer class="card-footer">
										<b>Info</b>
										<br />#A6B8D0
									</footer>
								</div>
							</li>
						</ul>
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab === 1}"
					>
						Typography
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 2}"
					>
						Buttons
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 3}"
					>
						Components
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 4}"
					>
						Form
					</div>
					<div
						class="tab-content"
						:class="{'is-active':currentTab == 5}"
					>
						Table
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import NavBar from '@views/layouts/NavBar';

export default {
	name: 'StyleGuide',
	components: { NavBar },
	data() {
		return {
			currentTab: 0,
			tabComponents: [
				{ id: 0, name: 'Color Palette', icon: 'fas fa-palette' },
				{ id: 1, name: 'Typography', icon: 'fas fa-i-cursor' },
				{ id: 2, name: 'Buttons', icon: 'fas fa-hand-point-up' },
				{ id: 3, name: 'Components', icon: 'far fa-object-group' },
				{ id: 4, name: 'Form', icon: 'fab fa-wpforms' },
				{ id: 5, name: 'Table', icon: 'fas fa-table' }
			]
		}
	},
	methods: {
		changeTab(tab) {
			this.currentTab = tab;
		}
	},
}
</script>
