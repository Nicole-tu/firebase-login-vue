<template>
	<div class="setting-card box">
		<div class="columns">
			<div class="column is-3">
				<aside class="menu is-hidden-mobile is-transparent">
					<ul class="menu-list">
						<li
							v-for="(t,i) in tabComponents"
							:key="i"
						>
							<a
								@click="changeTab(t.name)"
								:class="{'is-active':currentTab === t.name}"
							>
								<i :class="t.icon" />
								{{ t.name }}</a>
						</li>
					</ul>
				</aside>
				<div class="tabs is-fullwidth is-hidden-tablet">
					<ul>
						<li
							v-for="(t,i) in tabComponents"
							:key="i"
							:class="{'is-active':currentTab === t.name}"
						>
							<a @click="changeTab(t.name)">
								<i :class="t.icon" />
								{{ t.name }}</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="column is-9">
				<component :is="currentTab" />
			</div>
		</div>
	</div>
</template>

<script>
import Profile from './Profile';
import Category from './Category';
import Notification from './Notification';

export default {
	name: 'Settings',
	components: { Category, Profile, Notification },
	data() {
		return {
			currentTab: 'Category'
		}
	},
	methods: {
		changeTab(tab) {
			this.currentTab = tab;
		}
	},
	computed: {
		tabComponents() {
			return [{ name: 'Category', icon: 'far fa-list-alt' }, { name: 'Profile', icon: 'far fa-id-card' }, { name: 'Notification', icon: 'far fa-bell' }]
		}
	}
}
</script>
