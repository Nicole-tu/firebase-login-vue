import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter)


const router = new VueRouter({
	routes,
	mode: 'history',
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => {
			return record.meta.requireAuth;
		})) {
		if (localStorage.getItem('token')) {
			next();
		} else {
			return next({
				name: 'Login'
			});;
		}
	} else {
		next();
	}
});

export default router;
