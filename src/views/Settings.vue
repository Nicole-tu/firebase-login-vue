<template>
	<div class="setting-card box">
		<div class="is-hidden-tablet">
			<div class="tabs is-fullwidth">
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
		<div class="mt-5">
			<component :is="currentTab" />
		</div>
	</div>
</template>

<script>
import Profile from './Profile.vue';
import Category from './Category.vue';

export default {
	name: 'Settings',
	components: { Category, Profile },
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
	watch: {
		'$route.params.pageType'(to) {
			this.currentTab = _.startCase(_.toLower(to));
		}
	},
	computed: {
		tabComponents() {
			return [{ name: 'Category', icon: 'far fa-list-alt' }, { name: 'Profile', icon: 'far fa-id-card' }]
		}
	},
	mounted() {
		this.currentTab = _.startCase(_.toLower(this.$route.params.pageType));
	}
}
</script>
