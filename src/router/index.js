import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes';
import { auth } from '@/firebase';

Vue.use(VueRouter)


const router = new VueRouter({
	routes,
	mode: 'history',
	linkActiveClass: 'is-active'
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

	if (requiresAuth && !auth.currentUser) {
		next('/login')
	} else {
		next()
	}
});

export default router;
