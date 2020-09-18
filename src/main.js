// import Vue
import Vue from 'vue';

// import Vue App, routes, store, i18n, mixins
import App from './App.vue';
import router from '@router';
import store from '@store';
import mixins from '@mixins';

// import plugin
import '@plugins';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
