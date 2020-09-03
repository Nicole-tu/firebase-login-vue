const routes = [{
  path: '/',
  name: 'Main',
  redirect: '/login',
  component: () => import('@views/Main'),
  meta: {
    auth: true
  },
  children: [
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@views/Profile")
    }
  ]
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
