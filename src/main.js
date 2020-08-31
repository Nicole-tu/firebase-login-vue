// import Vue
import Vue from "vue";

// import Vue App, routes, store, i18n, mixins
import App from "./App.vue";
import router from "@router";
import store from "@store";
import { auth } from './firebase'

import {
	customMixins
} from '@mixins';
Vue.mixin(customMixins);

// import plugin
import "@plugins";

window.moment = require("moment");

Vue.config.productionTip = false;

let app
auth.onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}

	if (user) {
		store.dispatch('fetchUserProfile', user)
	}
})
