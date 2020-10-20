const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/dashboard',
    component: () => import('@views/Main'),
    meta: {
      requiresAuth: false
    },
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        requireAuth: true
      },
      component: () => import('@views/Dashboard')
    },
    {
      path: '/inventory',
      name: 'Inventory',
      meta: {
        requireAuth: true
      },
      component: () => import('@views/Inventory')
    },
    {
      path: '/settings/:pageType',
      name: 'Settings',
      props: true,
      meta: {
        requireAuth: true
      },
      component: () => import('@views/Settings')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/Login')
  },
  {
    path: '/styleGuide',
    name: 'StyleGuide',
    component: () => import('@views/StyleGuide')
  },
  {
    path: '*',
    redirect: '/login'
  }
];

export default routes;
