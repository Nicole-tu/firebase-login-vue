<template>
	<div class="setting-card box">
		<div class="tabs is-fullwidth">
			<ul>
				<li
					v-for="t in tabComponents"
					:key="t"
					:class="{'is-active':currentTab === t}"
				>
					<a @click="changeTab(t)">{{ t }}</a>
				</li>
			</ul>
		</div>
		<component :is="currentTab" />
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
			currentTab: Category
		}
	},
	methods: {
		changeTab(tab) {
			this.currentTab = tab;
		}
	},
	computed: {
		tabComponents() {
			return ['Category', 'Profile', 'Notification']
		}
	}
}
</script>
