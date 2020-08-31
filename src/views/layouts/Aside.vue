<template>
	<aside
		:class="{ expand: isExpand }"
		class="jx-main-aside"
	>
		<div class="jx-main-aside-title">
			<div class="text">{{ $t('common.system_name') }}</div>
			<button
				type="button"
				class="btn btn-sm"
				@click="onClickToggle"
			>
				<i class="la la-angle-right"></i>
			</button>
		</div>
		<ul class="nav nav-vertical">
			<template v-for="(item, i) in asideItems">
				<li
					class="nav-item"
					v-if="item.children.length == 0"
					:key="i"
					@click="clickAsideItem(item.url)"
				>
					<router-link
						class="nav-link"
						:active-class="'active'"
						:to="item.url"
					>
						<i :class="item.icon"></i>
						<span>{{ $t(`aside_menu.${item.displayNameKey}`) }}</span>
					</router-link>
				</li>
				<li
					v-else
					class="nav-item"
					:key="i"
				>
					<a
						href="javascript:;"
						class="nav-link has-tree"
						v-b-toggle="`collapse-${i}`"
						@click="clickSubNav(`collapse-${i}`)"
					>
						<i :class="item.icon" />
						<span>{{ $t(`aside_menu.${item.displayNameKey}`) }}</span>
						<i
							class="when-open la la-chevron-circle-down"
							aria-hidden="true"
						/>
						<i
							class="when-closed la la-chevron-circle-left"
							aria-hidden="true"
						/>
					</a>
					<b-collapse :id="`collapse-${i}`">
						<ul class="sub-nav nav-vertical">
							<li
								v-for="list in item.children"
								:key="list.id"
								class="nav-item"
								@click="clickAsideItem(list.url)"
							>
								<router-link
									class="nav-link"
									:active-class="'active'"
									:to="list.url"
								>
									<i :class="list.icon"></i>
									<span>{{ $t(`aside_menu.${list.displayNameKey}`) }}</span>
								</router-link>
							</li>
						</ul>
					</b-collapse>
				</li>
			</template>
		</ul>
	</aside>
</template>

<script>
export default {
	name: "Aside",
	data() {
		return {
			isExpand: true,
			currentAsidePath: ""
		};
	},
	computed: {
		asideItems() {
			return this.$store.getters.sidebarList;
		},
		defaultAsidePath() {
			if (sessionStorage.getItem("asidePath")) {
				return sessionStorage.getItem("asidePath");
			} else {
				if (this.asideItems.length == 0) {
					return "";
				} else {
					sessionStorage.setItem("asidePath", this.asideItems[0].url);
					return this.asideItems[0].url;
				}
			}
		}
	},
	watch: {
		currentAsidePath() {
			if (this.$route.path !== this.currentAsidePath)
				this.$router.push({ path: this.currentAsidePath });
		}
	},
	methods: {
		clickAsideItem(path) {
			this.currentAsidePath = path;
			if (this.$route.path != path) {
				this.$router.push({ path: path });
			}
			sessionStorage.setItem("asidePath", path);
			let subNavActives = document.querySelectorAll("a.has-tree.active");
			if (subNavActives.length > 0) {
				subNavActives.forEach(subNav => {
					subNav.classList.remove("active");
				});
			}
		},
		clickSubNav(collapseId) {
			let collapseMenu = document.querySelector(`#${collapseId}`);
			let collapseItem = collapseMenu.previousElementSibling;
			if (
				collapseMenu.querySelectorAll(
					"ul.sub-nav li.nav-item a.nav-link.active"
				).length > 0 &&
				collapseItem.classList.contains("not-collapsed")
			) {
				let subNavActives = document.querySelectorAll("a.has-tree.active");
				if (subNavActives.length > 0) {
					subNavActives.forEach(subNav => {
						subNav.classList.remove("active");
					});
				}
				collapseItem.classList.add("active");
			} else {
				collapseItem.classList.remove("active");
			}
		},
		onClickToggle() {
			this.isExpand = !this.isExpand;

			if (window.innerWidth < 992) {
				sessionStorage.removeItem("collapse");
				return;
			}
			if (this.isExpand) {
				sessionStorage.setItem("collapse", 1);
			} else {
				sessionStorage.setItem("collapse", 0);
			}
		},
		checkExpand() {
			if (window.innerWidth < 992) {
				sessionStorage.removeItem("collapse");
				return false;
			}
			if (sessionStorage.getItem("collapse")) {
				return sessionStorage.getItem("collapse") == 1 ? true : false;
			}
			return true;
		},
		onResize() {
			this.isExpand = this.checkExpand();
		}
	},
	mounted() {
		this.currentAsidePath = this.defaultAsidePath;
		window.addEventListener("resize", this.onResize);

		let collapseMenus = document.querySelectorAll("div.collapse");
		collapseMenus.forEach(collapseMenu => {
			let collapseItem = collapseMenu.previousElementSibling;
			if (
				collapseMenu.querySelectorAll(
					"ul.sub-nav li.nav-item a.nav-link.active"
				).length > 0 &&
				collapseItem.classList.contains("collapsed")
			) {
				collapseItem.classList.add("active");
			}
		});
	},
	created() {
		this.isExpand = this.checkExpand();
	}
};
</script>
