const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/inventory',
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
      path: '/report',
      name: 'Report',
      meta: {
        requireAuth: true
      },
      component: () => import('@views/Report')
    },
    {
      path: '/settings',
      name: 'Settings',
      meta: {
        requireAuth: true
      },
      // component: () => import('@views/Settings')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/Login')
  },
  {
    path: '*',
    redirect: '/login'
  }
];

export default routes;
