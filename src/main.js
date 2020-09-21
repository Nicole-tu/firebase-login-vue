// import Vue
import Vue from 'vue';

// import Vue App, routes, store, i18n, mixins
import App from './App.vue';
import router from '@router';
import store from '@store';
import mixins from '@mixins';

// import plugin
import '@plugins';

// import global css
import '@assets/scss/main.scss'

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	mixins: [mixins],
	render: h => h(App)
}).$mount('#app')
