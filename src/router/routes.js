const routes = [
  {
    path: '/',
    name: 'Profile',
    // component: () => import("@views/Profile"),
    component: () => import("@views/Main"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/Login")
  },
  {
    path: '*',
    redirect: '/login'
  }
];

export default routes;
