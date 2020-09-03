import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes';
import { auth } from '@/firebase';

Vue.use(VueRouter)


const router = new VueRouter({
	routes,
	mode: 'history',
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		auth.onAuthStateChanged(user => {
			if (user) {
				next()
			} else {
				next({
					path: "/login",
				})
			}
		})
	} else if (to.matched.some(record => record.meta.guest)) {
		auth.onAuthStateChanged(user => {
			if (user) {
				next({
					path: "/profile",
				})
			} else {
				next()
			}
		})

	} else {
		next()
	}
});

export default router;
